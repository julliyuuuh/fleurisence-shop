import { AuthContext } from "./AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

const defaultPrefs = {
  orderUpdates: true,
  offers: false,
  reminders: true,
  motion: "user", // "user" = follow the device, "always" = calm, "never" = full
};

// Google and Apple sign-in need real developer keys and a server.
// For this portfolio demo, those buttons sign you in as a sample shopper.
const demoProfiles = {
  google: { name: "Alex Rivera", email: "alex.rivera@gmail.demo" },
  apple: { name: "Sam Cruz", email: "sam.cruz@icloud.demo" },
};

const blankAccount = { phone: "", address: "", city: "", prefs: defaultPrefs };

export default function AuthProvider({ children }) {
  const [accounts, setAccounts] = useLocalStorage("fleurisence-accounts", []);
  const [currentEmail, setCurrentEmail] = useLocalStorage(
    "fleurisence-user",
    null,
  );

  const found = accounts.find((a) => a.email === currentEmail);
  // Older saved accounts may not have prefs yet, so fill in the defaults.
  const user = found
    ? { ...found, prefs: { ...defaultPrefs, ...found.prefs } }
    : null;

  function signUp({ name, email }) {
    const clean = email.trim().toLowerCase();
    if (accounts.some((a) => a.email === clean)) {
      return "There's already an account with this email. Try signing in instead.";
    }
    setAccounts((current) => [
      ...current,
      { ...blankAccount, name: name.trim(), email: clean },
    ]);
    setCurrentEmail(clean);
    return null;
  }

  function signIn(email) {
    const clean = email.trim().toLowerCase();
    if (!accounts.some((a) => a.email === clean)) {
      return "We couldn't find an account with that email. Want to create one?";
    }
    setCurrentEmail(clean);
    return null;
  }

  function signInWith(provider) {
    const profile = demoProfiles[provider];
    setAccounts((current) =>
      current.some((a) => a.email === profile.email)
        ? current
        : [...current, { ...blankAccount, ...profile, provider }],
    );
    setCurrentEmail(profile.email);
  }

  function signOut() {
    setCurrentEmail(null);
  }

  function updateProfile(changes) {
    setAccounts((current) =>
      current.map((a) => (a.email === currentEmail ? { ...a, ...changes } : a)),
    );
  }

  function updatePrefs(changes) {
    setAccounts((current) =>
      current.map((a) =>
        a.email === currentEmail
          ? { ...a, prefs: { ...defaultPrefs, ...a.prefs, ...changes } }
          : a,
      ),
    );
  }

  function deleteAccount() {
    setAccounts((current) => current.filter((a) => a.email !== currentEmail));
    setCurrentEmail(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signInWith,
        signOut,
        updateProfile,
        updatePrefs,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
