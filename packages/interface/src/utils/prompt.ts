/**
 * getBattlePrompt
 * @param tokenURIs tokenURIsをJSON.stringifyした文字列
 * @return {string} prompt
 */
export const getBattlePrompt = (tokenURIs: any[]): string => {
  let str = "";
  let name = "";
  for (let i = 0; i < tokenURIs.length; i++) {
    str += `NFT${i + 1}:\n`;
    str += JSON.stringify(tokenURIs[i]);
    if (i + 1 !== tokenURIs.length) str += `\n\n`;
    name += `"${tokenURIs[i].name}"`;
    if (i + 1 !== tokenURIs.length) name += ", ";
  }

  return `下記のNFTから連想したモンスターをバトルロワイヤル形式で戦わせ、戦闘結果と順位を出力してください。戦闘結果は実況形式で出力し、500文字以内で必ず決着をつけてください。

"""
${str}
"""

承知しました。それでは${name}の戦闘結果と順位を500文字以内で実況します。
戦闘結果:

`;
};
