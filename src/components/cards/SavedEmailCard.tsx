import { MdEmail } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const SavedEmailCard = ({ email }: { email: string | null }) => {
	return (
		<div className="rounded-full border p-4 flex justify-between items-center gap-4 shadow">
			<MdEmail className="text-3xl dark:text-muted-foreground" />
			<div className="border-l-2 pl-4 w-full">
				<p className="text-sm text-muted-foreground">Email Address</p>
				<h4 className="text-lg text-white">{email}</h4>
			</div>
			<IoCheckmarkDoneCircle className="text-green-500 text-3xl" />
		</div>
	);
};
export default SavedEmailCard;
