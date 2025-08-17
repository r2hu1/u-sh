import { SignedIn } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import { ClerkLoaded } from "@clerk/nextjs";

export default async function IfLoggedInElse({ ifUser, ifNot }) {
	return (
		<ClerkLoaded>
			<SignedIn>{ifUser}</SignedIn>
			<SignedOut>{ifNot}</SignedOut>
		</ClerkLoaded>
	);
}
