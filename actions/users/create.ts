"use server";

import { API_URL } from "@/constants";

export async function createUser(formData: FormData) {
    const userData: any = {
        userName: formData.get("userName"),
        userEmail: formData.get("userEmail"),
        userPassword: formData.get("userPassword"),
        userDocument: formData.get("userDocument") || null,
    };

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
            // credentials: "include",
        });

        if (response.status === 201) {
            return { success: true };
        }

        const error = await response.json();
        return { success: false, message: error.message || "Error creating user" };

    } catch (err) {
        return { success: false, message: "Server error" };
    }
}