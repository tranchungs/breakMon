/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "", // hoặc xóa hẳn phần headers để không gửi header này
          },
        ],
      },
    ];
  },
};

export default nextConfig;
