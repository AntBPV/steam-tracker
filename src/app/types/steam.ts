export interface Game {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url: string;
  img_logo_url: string;
}

export interface SteamProfile {
  steamid: string;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  personastate: number;
  communityvisibilitystate: number;
  profilestate: number;
  lastlogoff: number;
  commentpermission?: number;
}

export interface SteamApiResponse {
  playerSummaries?: {
    response: {
      players: SteamProfile[];
    };
  };
  ownedGames?: {
    response: {
      games: Game[];
    };
  };
}
