import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfileImageProps {
	image: string;
	initials: string;
}

const UserProfileImage = ({ image, initials }: UserProfileImageProps) => {
	return (
		<Avatar className="size-10 shrink-0 border-2 md:size-12">
			<AvatarImage src={image} className="object-cover" />
			<AvatarFallback>{initials}</AvatarFallback>
		</Avatar>
	);
};

export default UserProfileImage;
