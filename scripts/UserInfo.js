class UserInfo {
  constructor({ profileTitleSelector, profileSubtitleSelector}) {
    this._profileTitle = document.querySelector(profileTitleSelector);
    this._profileSubtitle = document.querySelector(profileSubtitleSelector);
  };

  getUserInfo() {
    return {
      profileTitleContent: this._profileTitle.textContent,
      profileSubtitleContent: this._profileSubtitle.textContent,
    }
  }

  setUserInfo({ profileTitleContent, profileSubtitleContent }) {
    this._profileTitle.textContent = profileTitleContent;
    this._profileSubtitle.textContent = profileSubtitleContent;
  }
};

export default UserInfo;


