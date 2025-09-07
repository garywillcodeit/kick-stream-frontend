const headerComponentData = (username) => {
  return [
    {
      path: "/account",
      search: false,
      options: true,
    },
    {
      path: "/terms-of-use",
      search: false,
      options: true,
    },
    {
      path: "/privacy-policy",
      search: false,
      options: true,
    },
    {
      path: "/contact-us",
      search: false,
      options: true,
    },
    {
      path: "/my-likes",
      search: false,
      options: true,
    },
    {
      path: "/discover",
      search: true,
      options: true,
    },
    {
      path: "/login",
      search: false,
      options: true,
    },
    {
      path: "/signup",
      search: false,
      options: true,
    },
    {
      path: "/settings",
      search: false,
      options: true,
    },
    {
      path: `/${username}`,
      search: false,
      options: true,
    },
  ];
};

export default headerComponentData;
