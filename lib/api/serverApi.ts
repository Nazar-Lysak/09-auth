
import { cookies } from "next/headers";
import { nextServer } from "./api";

// fetchNotes

// fetchNoteById

// getMe
export const getMe = async () => {
    const cookieStore = await cookies();

    const res = await nextServer.get("/users/me", {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });

    return res.data;
};
// checkSession