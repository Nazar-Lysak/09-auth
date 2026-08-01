"use client"

import Image from "next/image";

interface RegisterData {
  username: string;
}
import css from "./EditProfilePage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { updateMe } from "@/lib/api/clientApi";

function EditProfilePage() {
  const { user } = useAuthStore();
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => updateMe(data),

    onSuccess: () => {
      router.push("/profile");
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const username = formData.get("username");

    if (typeof username !== "string") {
      return;
    }

    registerMutation.mutate({
      username
    });
  };

  const cancelClick = () => {
    router.push("/profile")
  }
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar || ""}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={onSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input id="username" name="username" type="text" className={css.input} />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton} onClick={cancelClick}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditProfilePage;
