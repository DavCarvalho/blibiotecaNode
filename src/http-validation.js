function extractLinks(arrLinks) {
  return arrLinks.map((objectLink) => Object.values(objectLink).join());
}

async function checkStatus(listUrls) {
  const arrStatus = await Promise.all(
    listUrls.map(async (url) => {
      try {
        const response = await fetch(url, { method: "HEAD" });
        return `${response.status} - ${response.statusText}`;
      } catch (error) {
        return Errors(error)
      }
    })
  );
  return arrStatus;
}

function Errors(error) {
  if (error.cause && error.cause.code === "ENOTFOUND") {
    return "link not found";
  } else {
    return "something wrong";
  }
}

export async function validatedList(listLinks) {
  const links = extractLinks(listLinks);
  const status = await checkStatus(links);

  return listLinks.map((object, indice) => ({
    ...object,
    status: status[indice],
  }));
}
