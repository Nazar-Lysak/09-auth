interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  return <div>{children}</div>;
}

export default AuthProvider;
