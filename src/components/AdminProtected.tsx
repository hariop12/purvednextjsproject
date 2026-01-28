import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { account } from "../lib/appwrite";

interface Props {
  children: ReactNode;
}

const AdminProtected = ({ children }: Props) => {
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    account
      .get()
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return null;

  return auth ? <>{children}</> : <Navigate to="/admin" />;
};

export default AdminProtected;
