class UserInfo {
  constructor({ profileTitleSelector, profileSubtitleSelector,profileAvatarSelector }) {
    this._profileTitle = document.querySelector(profileTitleSelector);
    this._profileSubtitle = document.querySelector(profileSubtitleSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {  
      profileTitleContent: this._profileTitle.textContent,
      profileSubtitleContent: this._profileSubtitle.textContent,
    };
  }

  setUserInfo({ avatar, title, subtitle }) {
    this._profileAvatar.src = avatar;
    this._profileTitle.textContent = title;
    this._profileSubtitle.textContent = subtitle;
  }
}

export default UserInfo;
