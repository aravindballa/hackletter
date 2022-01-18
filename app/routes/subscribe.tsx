import { ActionFunction, json } from "remix";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const name = formData.get("name") as string | null;

  const lastName = formData.get("lastname");
  if (lastName) return json({ error: new Error("hack?") });

  try {
    const response = await fetch(
      "https://api.buttondown.email/v1/subscribers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // @ts-ignore
          Authorization: `Token ${BUTTONDOWN_TOKEN}`,
        },
        body: JSON.stringify({
          email,
          tags: ["hackletter-website"],
          meta: {
            name,
            firstname: name?.trim().split(" ")[0],
          },
        }),
      }
    );

    if (response.status === 201) {
      const message = `New subscriber 💌: ${name} added to mailing list.`;
      try {
        await fetch(
          // @ts-ignore
          `https://api.telegram.org/bot${TELEGRAM_API_KEY}/sendMessage?chat_id=506959518&text=${encodeURI(
            message
          )}`
        );
      } catch (err) {
        throw err;
      }
      return json({ ok: true });
    } else throw new Error(`${response.status} ${response.statusText}`);
  } catch (error) {
    return json({ error });
  }
};
