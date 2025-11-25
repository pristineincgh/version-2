import { MdOutlineQuiz } from "react-icons/md";
import { RiGuideLine, RiHome9Line } from "react-icons/ri";
import { AiOutlineSchedule } from "react-icons/ai";

export const studentNavLinks = [
	{
		title: "Dashboard",
		href: "/student",
		icon: <RiHome9Line className="size-6" />,
	},
	{
		title: "My Roadmaps",
		href: "/student/roadmaps",
		icon: <RiGuideLine className="size-6" />,
	},
	// {
	//   title: 'Assignments',
	//   href: '/student/assignments',
	//   icon: <MdWorkspacesOutline className="size-6" />,
	// },
	{
		title: "Quizzes",
		href: "/student/quizzes",
		icon: <MdOutlineQuiz className="size-6" />,
	},
	{
		title: "Schedule",
		href: "/student/schedule",
		icon: <AiOutlineSchedule className="size-6" />,
	},
];
