/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

module.exports = {
  name: "profile",
  aliases: ["pr"],
  cooldown: "",
  category: "config",
  usage: "",
  description: "See server configs",
  args: false,
  vote: false,
  new: false,
  admin: false,
  owner: false,
  botPerms: [],
  userPerms: [],
  player: false,
  queue: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (client, message, args, emoji) => {
    let [pfx, premiumUser, dev, admin] = await Promise.all([
      await client.db.pfx.get(`${client.user.id}_${message.author.id}`),
      await client.db.premium.get(`${client.user.id}_${message.author.id}`),
      await client.owners.find((x) => x === message.author.id),
      await client.admins.find((x) => x === message.author.id),
    ]);

    let premium =
      premiumUser == true
        ? "Lifetime"
        : premiumUser
          ? `Expiring <t:${`${premiumUser}`?.slice(0, -3)}:R>`
          : `\`Not Activated\``;

    await message
      .reply({
        embeds: [
          new client.embed()

            .setAuthor({
              name: `Profile Overview`,
              iconURL: client.user.displayAvatarURL(),
            })
            .desc(
              `**Custom Prefix : ${pfx ? `\`${pfx}\`` : `\`Not set\``}**\n\n` +
                `**Your Acknowledgement/(s) :**\n` +
                `${dev ? `${emoji.dev} - Developer\n` : ``}` +
                `${admin ? `${emoji.admin} - Administrator\n` : ``}` +
                `${
                  premiumUser ? `${emoji.premium} - Premium Subscriber\n` : ``
                }` +
                `${emoji.user} - My precious user/(s)\n\n` +
                `**Premium : ${premium}**\n\n`,
            )

            .thumb(message.member.displayAvatarURL())
            .setFooter({
              text: `INVISIBLE 😶`,
            }),
        ],
      })
      .catch(() => {});
  },
};
