export default (client, channelId, userId) => {
  const owners = client.tempVoiceOwners
  return owners && owners.get(channelId) === userId
}
