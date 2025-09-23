import Link from "next/link";

export default function AccountNavigation() {
    return (
        <div id="wd-account-navigation">
            <Link href="/Account/Signin"  id="wd-account-signin-link">Signin</Link><br/>
            <Link href="/Account/Signup"  id="wd-account-signup-link">Signup</Link><br/>
            <Link href="/Account/Profile" id="wd-account-profile-link">Profile</Link><br/>
        </div>
    );
}