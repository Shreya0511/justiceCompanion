import quickFix from "../../assets/quickFix.svg";
import chatbot from "../../assets/chatbot.svg";
// import guide from "../../assets/guide.svg";
import chat from "../../assets/chat.svg";
import forum from "../../assets/forum.svg";
import guide from "../../assets/guidetemp.svg";
import steps from "../../assets/steps.svg";
import efile from "../../assets/eflie.svg";
import pastcases from "../../assets/pastcases.svg";
import findlawyer from "../../assets/findlawyer.svg";
const content = [
	{
		title: "ChatBot",
		description:
			"This section allows users to interact with a chatbot that can answer their legal queries and provide them with the necessary information.",
		img: chatbot,
		lawyer: true,
		user: true,
		path: "/chat-bot",
	},
	{
		title: "Legal Guide",
		description:
			"Your comprehensive legal knowledge base. Access articles on family law, business law, and more to navigate legal matters effectively.",
		lawyer: true,
		user: true,
		img: guide,
		path: "/guide",
	},
	{
		title: "Quick Fix Court",
		description:
			"Resolve disputes efficiently. Engage in real-time negotiation and arbitration with legal guidance. Quick, accessible, and effective dispute resolution with ChatCourt.",
		lawyer: true,
		user: true,
		img: quickFix,
		path: "/Quick-fix-court",
	},
	{
		title: "Find Lawyer",
		description:
			"Easily find the right lawyer for your needs. Browse our database, filter by practice areas, and connect directly with skilled legal professionals. Whether it's advice or representation, LawyerFinder streamlines communication and the hiring process.",
		lawyer: false,
		user: true,
		img: findlawyer,
		path: "/find-lawyer",
	},
	{
		title: "Prep and Pitch",
		description:
			" Your ultimate resource for case preparation. Access detailed guides for approaching lawyers online or offline. From initial consultation to case preparation, CasePrep Pro equips you with the knowledge and tools needed for effective communication. Whether it's personal injury claims, contract disputes, or family law matters, CasePrep Pro ensures you're ready to engage confidently with legal professionals.",
		lawyer: false,
		user: true,
		img: steps,
		path: "/prep-and-pitch",
	},
	{
		title: "E-Filing",
		description:
			"Securely file your cases online with ease. Access authorized links for submitting legal documents and initiating proceedings. Whether it's a civil lawsuit, divorce application, or complaint submission, E-FileNow streamlines the process, saving time and ensuring compliance.",
		lawyer: true,
		user: true,
		img: efile,
		path: "/efilling",
	},
	{
		title: "Peer-Connect",
		description:
			"Join a dynamic forum to connect with peers and legal experts. Engage in discussions, seek advice, and share experiences on various legal topics. Whether it's employment law, real estate transactions, or intellectual property rights, LegalConnect fosters a supportive community for sharing insights and seeking support.",
		lawyer: true,
		user: true,
		img: forum,
		path: "/peer-connect",
	},
	{
		title: "Trial Detainees",
		description:
			"Navigate the legal system with confidence. Access guidance on rights, legal assistance, and advocacy for fair treatment. Empowering detainees with the tools to assert their rights and pursue justice effectively.",
		lawyer: false,
		user: true,
		img: quickFix,
		path: "/trial-detainees",
	},
	{
		title: "Past Cases",
		description:
			"Gain valuable insights and precedents from a database of similar legal cases. Strengthen your arguments by exploring past rulings and outcomes, empowering you to build a stronger case, negotiate settlements, or seek legal advice confidently.",
		lawyer: true,
		user: true,
		img: pastcases,
		path: "/pastcases",
	},
	{
		title: "Messages",
		description:
			"Instantly connect with lawyers for confidential discussions, advice, and updates on your case. Share documents, schedule appointments, and clarify legal matters conveniently through secure messaging channels.",
		lawyer: true,
		user: true,
		img: chat,
		path: "/chat",
	},
	{
		title: "Requests",
		description:
			"This section allows lawyers to view chat/hire requests sent by users and connect with them, acting as a matchmaker between users seeking legal assistance and lawyers ready to provide their expertise.",
		img: quickFix,
		lawyer: true,
		user: false,
		path: "/requests",
	},
];

export default content;
