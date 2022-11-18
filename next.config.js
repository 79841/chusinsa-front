/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/login",
        destination: `http://141.164.51.245:8000/auth/`,
      },
      {
        source: "/api/products/:path*",
        destination: `http://141.164.51.245:8000/shop/:path*`,
      },
      {
        source: "/api/reviews/:category/:id",
        destination: `http://141.164.51.245:8000/review/shop-single/:category/:id`,
      },
      {
        source: "/api/product/:category/:id",
        destination: `http://141.164.51.245:8000/product/:category/:id`,
      },
      {
        source: "/api/recommend/:category",
        destination: `http://141.164.51.245:8000/recommend/:category`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/shop/top",
        permanent: true,
      },
      {
        source: "/shop",
        destination: "/shop/top",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
