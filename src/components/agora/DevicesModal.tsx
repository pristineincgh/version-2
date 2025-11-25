"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useEnterClassroomMutation } from "@/services/sessions/mutations";
import { getAuthUser } from "@/store/useAuthStore";
import { useClassroomStore } from "@/store/useClassroomStore";
import AgoraRTC, {
	LocalVideoTrack,
	useLocalCameraTrack,
	useLocalMicrophoneTrack,
} from "agora-rtc-react";
import { Loader2, Mic, MicOff, Video, VideoOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DevicesModalProps {
	open: boolean;
	onClose: () => void;
	session?: SessionDetails;
}

const DevicesModal = ({ open, onClose, session }: DevicesModalProps) => {
	const { isLoading: isLoadingMic, localMicrophoneTrack } =
		useLocalMicrophoneTrack();
	const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
	const [micEnabled, setMicEnabled] = useState(true);
	const [cameraEnabled, setCameraEnabled] = useState(true);

	const currentUser = getAuthUser();

	// Device lists
	const [microphones, setMicrophones] = useState<MediaDevice[]>([]);
	const [speakers, setSpeakers] = useState<MediaDevice[]>([]);
	const [cameras, setCameras] = useState<MediaDevice[]>([]);

	// Selected devices
	const [selectedMic, setSelectedMic] = useState<string>("");
	const [selectedSpeaker, setSelectedSpeaker] = useState<string>("");
	const [selectedCamera, setSelectedCamera] = useState<string>("");

	const router = useRouter();

	const { setClassroom, setIsInSession } = useClassroomStore();

	// Load available devices
	useEffect(() => {
		const loadDevices = async () => {
			try {
				const devices = await AgoraRTC.getDevices();

				const mics = devices.filter((device) => device.kind === "audioinput");
				const spks = devices.filter((device) => device.kind === "audiooutput");
				const cams = devices.filter((device) => device.kind === "videoinput");

				setMicrophones(mics);
				setSpeakers(spks);
				setCameras(cams);

				// Set default selections
				if (mics.length > 0 && !selectedMic) {
					setSelectedMic(mics[0].deviceId);
				}
				if (spks.length > 0 && !selectedSpeaker) {
					setSelectedSpeaker(spks[0].deviceId);
				}
				if (cams.length > 0 && !selectedCamera) {
					setSelectedCamera(cams[0].deviceId);
				}
			} catch (error) {
				console.error("Error loading devices:", error);
			}
		};

		loadDevices();
	}, [selectedCamera, selectedMic, selectedSpeaker]);

	// Handle microphone change
	const handleMicChange = async (deviceId: string) => {
		setSelectedMic(deviceId);
		if (localMicrophoneTrack) {
			await localMicrophoneTrack.setDevice(deviceId);
		}
	};

	// Handle camera change
	const handleCameraChange = async (deviceId: string) => {
		setSelectedCamera(deviceId);
		if (localCameraTrack) {
			await localCameraTrack.setDevice(deviceId);
		}
	};

	// Handle speaker change
	const handleSpeakerChange = async (deviceId: string) => {
		setSelectedSpeaker(deviceId);
		// Note: Speaker selection typically affects playback of remote audio
		// You may need to apply this when remote tracks play
	};

	// Handle microphone toggle
	const toggleMic = async () => {
		if (localMicrophoneTrack) {
			await localMicrophoneTrack.setEnabled(!micEnabled);
			setMicEnabled(!micEnabled);
		}
	};

	// Handle camera toggle
	const toggleCamera = async () => {
		if (localCameraTrack) {
			await localCameraTrack.setEnabled(!cameraEnabled);
			setCameraEnabled(!cameraEnabled);
		}
	};

	const deviceLoading = isLoadingMic || isLoadingCam;

	const { mutate: enterClassroom, isPending: isEnteringClassroom } =
		useEnterClassroomMutation();

	const handleJoinCall = () => {
		if (!session) return;

		enterClassroom(
			{
				role:
					currentUser?.role === "moderator"
						? "tutor"
						: (currentUser?.role as "tutor" | "student"),
				session_id: session.id,
				transcript_enabled: true,
			},
			{
				onSuccess: (data) => {
					setClassroom({
						app_id: data.app_id,
						channel_name: data.channel_name,
						token: data.token,
					});

					setIsInSession(true);

					router.push(
						currentUser?.role === "moderator"
							? `/moderator/classroom/?session_id=${session.id}`
							: currentUser?.role === "student"
							? `/student/classroom?session_id=${session.id}`
							: `/tutor/classroom?session_id=${session.id}`
					);
				},
			}
		);
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent
				// showCloseButton={false}
				onInteractOutside={(e) => e.preventDefault()}
				onEscapeKeyDown={(e) => e.preventDefault()}
				className="lg:max-w-[calc(100vw-10rem)] lg:h-[calc(100vh-9.5rem)]"
			>
				<DialogHeader className="sr-only">
					<DialogTitle>Devices</DialogTitle>
					<DialogDescription>
						Select your device before joining the call
					</DialogDescription>
				</DialogHeader>

				{deviceLoading ? (
					<div className="w-full h-full rounded-2xl p-8 grid place-content-center">
						<Loader2 className="size-16 mx-auto text-primary animate-spin" />
						<p className="text-gray-600">Loading devices...</p>
					</div>
				) : (
					<div className="w-full grid lg:grid-cols-3 gap-16 lg:gap-4">
						{/* Camera & Microphone Preview */}
						<div className="lg:col-span-2 w-full space-y-6">
							<div className="relative w-full aspect-video bg-foreground dark:bg-gray-700 rounded-lg overflow-hidden">
								{cameraEnabled ? (
									<LocalVideoTrack track={localCameraTrack} play={true} />
								) : (
									<div className="flex items-center justify-center h-full">
										<p className="text-background text-2xl">Camera is off</p>
									</div>
								)}

								{/* Toggle Buttons */}
								<div className="w-fit absolute left-1/2 -translate-x-1/2 bottom-4 px-3 flex items-center justify-center">
									<div className="flex items-center gap-4">
										<Button
											size="icon"
											variant={micEnabled ? "secondary" : "destructive"}
											onClick={toggleMic}
											className="rounded-full md:h-16 md:w-16"
										>
											{micEnabled ? (
												<Mic className="size-4 md:size-6" />
											) : (
												<MicOff className="size-4 md:size-6" />
											)}
										</Button>
										<Button
											size="icon"
											variant={cameraEnabled ? "secondary" : "destructive"}
											onClick={toggleCamera}
											className="rounded-full md:h-16 md:w-16"
										>
											{cameraEnabled ? (
												<Video className="size-4 md:size-6" />
											) : (
												<VideoOff className="size-4 md:size-6" />
											)}
										</Button>
									</div>
								</div>
							</div>
						</div>

						<div className="lg:col-span-1 w-full grid place-items-center gap-4">
							{/* Device Selectors */}
							<div className="space-y-3 grid gap-4 w-full">
								<div className="space-y-2">
									<label className="text-sm font-medium">Microphone</label>
									<Select value={selectedMic} onValueChange={handleMicChange}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select microphone" />
										</SelectTrigger>
										<SelectContent>
											{microphones.map((mic) => (
												<SelectItem key={mic.deviceId} value={mic.deviceId}>
													{mic.label ||
														`Microphone ${mic.deviceId.slice(0, 5)}`}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium">Speaker</label>
									<Select
										value={selectedSpeaker}
										onValueChange={handleSpeakerChange}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select speaker" />
										</SelectTrigger>
										<SelectContent>
											{speakers.map((speaker) => (
												<SelectItem
													key={speaker.deviceId}
													value={speaker.deviceId}
												>
													{speaker.label ||
														`Speaker ${speaker.deviceId.slice(0, 5)}`}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium">Camera</label>
									<Select
										value={selectedCamera}
										onValueChange={handleCameraChange}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select camera" />
										</SelectTrigger>
										<SelectContent>
											{cameras.map((camera) => (
												<SelectItem
													key={camera.deviceId}
													value={camera.deviceId}
												>
													{camera.label ||
														`Camera ${camera.deviceId.slice(0, 5)}`}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>

							<Button
								onClick={handleJoinCall}
								size="lg"
								className="h-14 rounded-full w-full"
								disabled={isEnteringClassroom}
							>
								{isEnteringClassroom ? (
									<>
										<Loader2 className="size-4 animate-spin" />
										<span>Joining...</span>
									</>
								) : (
									"Join Call"
								)}
							</Button>
						</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default DevicesModal;
