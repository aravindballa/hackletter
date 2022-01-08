export default function Footer() {
  return (
    <div className="w-full py-4 text-center mt-12 text-gray-600">
      <p>Built with ❤️ by Aravind &middot; {new Date().getFullYear()}</p>
      <p>Powered by Remix ⚡️ Cloudflare Workers</p>
      <p className="text-xs text-gray-500">
        Last built at {new Date().toISOString()}
      </p>
    </div>
  );
}
