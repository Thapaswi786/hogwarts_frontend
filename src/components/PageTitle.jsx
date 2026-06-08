import { useEffect } from "react";

function PageTitle({ title }) {
  useEffect(() => {
    document.title = `${title} | Hogwarts University`;
  }, [title]);
  return null;
}

export default PageTitle;
