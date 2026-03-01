import type { Metadata } from "next";
import "./globals.css";
import { ResumeProvider } from "@/context/ResumeContext";

export const metadata: Metadata = {
    title: "AI Resume Builder - Smart Resume Creation",
    description: "Create professional resumes with AI-powered features using OpenRouter",
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    themeColor: "#007AFF",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <ResumeProvider>
                    {children}
                </ResumeProvider>
            </body>
        </html>
    );
}
