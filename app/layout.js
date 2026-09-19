import "./globals.css";

export const metadata = {
  title: "Romantic 3D Galaxy",
  description: "A romantic 3D photo galaxy experience built with React Three Fiber",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black">{children}</body>
    </html>
  );
}
