import * as React from 'react'
import { StyleSheet, css, StyleDeclarationValue } from 'aphrodite/no-important'

import { sharedStyles } from './sharedStyles'
import UserAvatarIcon from './Assets/user-avatar-icon.svg'
import HomeIcon from './Assets/home-icon.svg'
import NotificationsIcon from './Assets/notifications-icon.svg'
import MessagesIcon from './Assets/messages-icon.svg'
import PhotosIcon from './Assets/photos-icon.svg'
import CommunityIcon from './Assets/community-icon.svg'
const ProfileIcon = UserAvatarIcon
import SettingsIcon from './Assets/preference-icon.svg'
import RightArrow from './Assets/right-arrow.svg'
import SearchIcon from './Assets/search-icon.svg'
import GifIcon from './Assets/gif-icon.svg'
import SmileIcon from './Assets/smile-icon.svg'
import PhotoIcon from './Assets/photo-icon.svg'
import MicIcon from './Assets/mic-icon.svg'
import DotsIcon from './Assets/dots-icon.svg'
import HeartIcon from './Assets/heart-icon.svg'
import RepostIcon from './Assets/repost-icon.png'
import EyeIcon from './Assets/eye-icon.svg'
import VerticalLogo from './vertical-logo.png'

const sidenavItemsSpaceBetween = 30

const sidenavItemsStyles = StyleSheet.create({
  sidenavItem: {
    display: 'flex',
    marginTop: sidenavItemsSpaceBetween,
  },

  sidenavItemIconActive: {
    width: 40,
    height: 40,
  },

  sidenavItemTextActive: {
    marginLeft: 15,
    font: 'bold 20px "Montserrat", Helvetica, Arial, serif',
    color: 'white',
  },

  sidenavItemIcon: {
    width: 40,
    height: 40,
    opacity: 0.6,
  },

  sidenavItemText: {
    marginLeft: 15,
    font: 'bold 20px "Montserrat", Helvetica, Arial, serif',
    color: 'white',
    opacity: 0.6,
  },
})

function SidenavItem(params: { name: string, iconPath: string, isActive: boolean }) {
  if (params.isActive) {
    return (
      <div className={css(sidenavItemsStyles.sidenavItem)}>
        <img className={css(sidenavItemsStyles.sidenavItemIconActive)} alt={params.name} src={params.iconPath} />
        <div className={css(sidenavItemsStyles.sidenavItemTextActive, styles.centerContainer)}>
          {params.name}
        </div>
      </div>
    )
  }

  return (
    <div className={css(sidenavItemsStyles.sidenavItem)}>
      <img className={css(sidenavItemsStyles.sidenavItemIcon)} alt={params.name} src={params.iconPath} />
      <div className={css(sidenavItemsStyles.sidenavItemText, styles.centerContainer)}>
        {params.name}
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  centerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
  },
  leftSidenav: {
    top: 0,
    position: 'sticky',
    zIndex: 1000,
    height: '100vh',
    background: `url('${VerticalLogo}'), linear-gradient(175.38deg, #BA03FB 0%, #2200F1 99.41%)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },

  sidenav: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 40,
    marginRight: 10,
    height: '100%',
  },

  mainContainer: {
    flexGrow: 1,

    display: 'flex',
    backgroundColor: 'white',
  },
  mainContent: {
    flexGrow: 1,
  },
  rightSidenav: {
    top: 0,
    position: 'sticky',
    zIndex: 1000,
    height: '100vh',
    paddingRight: 10,
  },
  topSpace: {
    flexBasis: 112,
    flexShrink: 1,
  },
  currentUserWrapper: {
  },
  userAndItemsSpace: {
    flexBasis: 88 - sidenavItemsSpaceBetween,
    flexShrink: 2,
  },
  sidenavItems: {
  },
  itemSettingsSpace: {
    flexBasis: 248 - sidenavItemsSpaceBetween,
    flexShrink: 2,
  },
  sidenavItemSettings: {
  },
  bottomSpace: {
    flexBasis: 50,
    flexShrink: 1,
  },
})

type UserCard = {
  Name: string,
  Tag: string,
  AvatarSrc?: string,
  IsVerified: boolean,
}

export const userCardStyles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    backgroundColor: '#b2b2b2',
  },
  undefinedAvatar: {
    width: 25,
    height: 25,
  },
  userContent: {
    marginLeft: 15,
  },
  userName: {
    font: 'bold 18px "Montserrat", Helvetica, Arial, serif',
    color: 'black',
  },
  userMention: {
    font: 'normal 13px "Montserrat", Helvetica, Arial, serif',
    color: 'black',
  },
})

function UserCardView(params: { userCard: UserCard }) {
  const { userCard } = params

  return (
    <div className={css(userCardStyles.container)}>
      {userCard.AvatarSrc ? (
        <img className={css(userCardStyles.avatar, styles.centerContainer)} alt="avatar" src={userCard.AvatarSrc} />
      ) : (
        <div className={css(userCardStyles.avatar, styles.centerContainer)}>
          <img className={css(userCardStyles.undefinedAvatar)} alt="avatar" src={UserAvatarIcon} />
        </div>
      )}
      <div className={css(userCardStyles.userContent, styles.centerContainer)}>
        <div>
          <div className={css(userCardStyles.userName)}>{userCard.Name.replace(' ', '\u00A0')}</div>
          <div className={css(userCardStyles.userMention)}>@{userCard.Tag}</div>
        </div>
      </div>
    </div>
  )
}

export const currentUserCardStyles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    backgroundColor: '#b2b2b2',
  },
  userName: {
    font: 'bold 18px "Montserrat", Helvetica, Arial, serif',
    color: 'white',
  },
  userMention: {
    font: 'normal 13px "Montserrat", Helvetica, Arial, serif',
    color: 'white',
  },
})

function CurrentUserCardView(params: { userCard: UserCard }) {
  const { userCard } = params

  return (
    <div className={css(userCardStyles.container)}>
      {userCard.AvatarSrc ? (
        <img className={css(currentUserCardStyles.avatar, styles.centerContainer)} alt="avatar" src={userCard.AvatarSrc} />
      ) : (
        <div className={css(currentUserCardStyles.avatar, styles.centerContainer)}>
          <img className={css(userCardStyles.undefinedAvatar)} alt="avatar" src={UserAvatarIcon} />
        </div>
      )}
      <div className={css(userCardStyles.userContent, styles.centerContainer)}>
        <div>
          <div className={css(currentUserCardStyles.userName)}>{userCard.Name}</div>
          <div className={css(currentUserCardStyles.userMention)}>@{userCard.Tag}</div>
        </div>
      </div>
    </div>
  )
}

const trendStyles = StyleSheet.create({
  trend: {
  },
  name: {
    font: 'normal 14px "Montserrat", Helvetica, Arial, serif',
  },
  tag: {
    font: 'bold 20px "Montserrat", Helvetica, Arial, serif',
  },
  likes: {
    font: 'normal 12px "Montserrat", Helvetica, Arial, serif',
  },
})


function Trend(params: { name: string, tag: string, likes: number }) {
  const { name, tag, likes } = params

  function toFixed(num: number) {
    return num // TODO: fix the number of decimal digits to 2 but removing zeros
  }

  let likesText
  if (likes < 1000000) {
    likesText = `${toFixed(likes / 1000)}K`
  } else if (likes < 1000000000) {
    likesText = `${toFixed(likes / 1000000)}M`
  } else if (likes < 1000000000000) {
    likesText = `${toFixed(likes / 1000000000)}B`
  } else {
    likesText = likes
  }

  return (
    <div className={css(trendStyles.trend)}>
      <div className={css(trendStyles.name)}>{name}</div>
      <div className={css(trendStyles.tag)}>#{tag}</div>
      <div className={css(trendStyles.likes)}>{likesText} likes</div>
    </div>
  )
}

const recomendationStyles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 20,
  },
  userCardContainer: {
    flexGrow: 1,
  },
  follow: {
    width: 90,
    height: 25,
    backgroundColor: '#9104FF',
    border: 'none',
    borderRadius: 5,
    color: 'white',
    font: 'bold 16px "Montserrat", Helvetica, Arial, serif',
  },
  followContainer: {
    display: 'flex',
    alignItems: 'center',
  },
})


function Recomendation(params: { userCard: UserCard }) {
  return (
    <div className={css(recomendationStyles.container)}>
      <div className={css(recomendationStyles.userCardContainer)}>
        <UserCardView userCard={params.userCard} />
      </div>
      <div className={css(recomendationStyles.followContainer)}>
        <button className={css(recomendationStyles.follow)}>
          Follow
        </button>
      </div>
    </div>
  )
}

const rightSidenavNotifications = StyleSheet.create({
  notificationIcon: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    backgroundColor: '#ba03fb',
  },
  notificationText: {
    font: 'normal 17px "Montserrat", Helvetica, Arial, serif',
    color: 'white',
  },
})

function NotificationsItem(params: { text: string }) {
  return (
    <div className={css(rightSidenavNotifications.notificationIcon, styles.centerContainer)}>
      <div className={css(rightSidenavNotifications.notificationText)}>
        {params.text}
      </div>
    </div>
  )
}

const rightSidenavStyles = StyleSheet.create({
  notificationsContainer: {
    marginTop: 40,
    display: 'flex',

    gap: 43,
  },
  notifications: {
    display: 'flex',
    gap: 12,

    flexGrow: 1,
  },
  notificationsNext: {
    display: 'flex',
    alignItems: 'center',
  },

  trendsContainer: {
    marginTop: 44,
  },
  trendsHeader: {
  },
  trendsHeaderText: {
    fontFamily: 'Montserrat, Helvetica, Arial, serif',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
  },
  trendListContainer: {
    marginTop: 15,

    marginLeft: 28,

    display: 'flex',
    flexDirection: 'column',
    gap: 30,
  },
  trendList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  trendSeemore: {
    font: '600 20px "Montserrat", Helvetica, Arial, serif',
    color: '#9104ff',
  },

  recomendationsContainer: {
    marginTop: 50,
  },

  recomendationsHeader: {
    font: 'bold 24px "Montserrat", Helvetica, Arial, serif',
  },

  recomendationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 25,
  },
})

function RightSidenav() {
  const trends: { Name: string; Tag: string, Likes: number } [] = [
    {
      Name: 'Family. Life',
      Tag: 'ukraine',
      Likes: 100000,
    },
    {
      Name: 'Travel. Knowledge',
      Tag: 'ukraine',
      Likes: 1000000,
    },
    {
      Name: 'Ukraine Trends',
      Tag: 'хіт',
      Likes: 500000,
    },
    {
      Name: 'Ukraine Trends',
      Tag: 'вшоколаде',
      Likes: 500000,
    },
  ]

  const recommendations = [
    {
      AvatarSrc: 'https://picsum.photos/id/885/128/128.jpg',
      Name: 'Taras Shevchenko1',
      Tag: 'kobzar',
      IsVerified: false,
    },
    {
      AvatarSrc: 'https://picsum.photos/id/468/128/128.jpg',
      Name: 'Taras Shevchenko2',
      Tag: 'kobzar',
      IsVerified: false,
    },
    {
      AvatarSrc: 'https://picsum.photos/id/903/128/128.jpg',
      Name: 'Taras Shevchenko3',
      Tag: 'kobzar',
      IsVerified: false,
    },
  ]

  return (
    <div className={css(styles.rightSidenav)}>
      <div className={css(rightSidenavStyles.notificationsContainer)}>
        <div className={css(rightSidenavStyles.notifications)}>
          <NotificationsItem text="SD" />
          <NotificationsItem text="ОД" />
          <NotificationsItem text="ИУ" />
          <NotificationsItem text="" />
          <NotificationsItem text="" />
        </div>
        <div className={css(rightSidenavStyles.notificationsNext)}>
          <img alt="RightArrow" src={RightArrow} />
        </div>
      </div>

      <div className={css(rightSidenavStyles.trendsContainer)}>
        <h1 className={css(rightSidenavStyles.trendsHeader, rightSidenavStyles.trendsHeaderText)}>
          What’s trending
        </h1>
        <div className={css(rightSidenavStyles.trendListContainer)}>
          <div className={css(rightSidenavStyles.trendList)}>
            {trends.map((value, i) => (
              <Trend key={i} name={value.Name} tag={value.Tag} likes={value.Likes} />
            ))}
          </div>

          <div className={css(rightSidenavStyles.trendSeemore)}>See more</div>
        </div>
      </div>

      <div className={css(rightSidenavStyles.recomendationsContainer)}>
        <div className={css(rightSidenavStyles.recomendationsHeader)}>
          Recommendations
        </div>
        <div className={css(rightSidenavStyles.trendListContainer)}>
          <div className={css(rightSidenavStyles.recomendationsList)}>
            {recommendations.map((value, i) => (
              <Recomendation key={i} userCard={value} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

function createMediaStyle(src: string) {
  return {
    height: 35,
    width: 35,

    backgroundSize: 'cover',
    backgroundImage: `url('${src}')`,
    backgroundRepeat: 'round',
  }
}

const mainStyles = StyleSheet.create({
  searchContainer: {
    marginTop: 40,
    marginLeft: 40,
  },
  searchInput: {
    marginLeft: 25,

    border: 'none',
    borderBottomColor: '#bbbbbb',
    borderBottomStyle: 'solid',
    borderBottomWidth: 'thin',
  },

  container: {
    marginLeft: 10,
    marginRight: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  container2: {
    flexBasis: 800,
  },

  submitPost: {
    marginTop: 90,
  },

  submitInput: {
    width: '100%',
    font: 'normal 22px "Montserrat", Helvetica, Arial, serif',

    border: 'none',
    borderBottomColor: '#bbbbbb',
    borderBottomStyle: 'solid',
    borderBottomWidth: 'thin',
  },

  submitFooter: {
    marginTop: 20,
  },

  mediaList: {
  },

  mediaGif: createMediaStyle(GifIcon),
  mediaPhoto: createMediaStyle(PhotoIcon),
  mediaSmile: createMediaStyle(SmileIcon),
  mediaMic: createMediaStyle(MicIcon),

  submitPublish: {
    width: 120,
    height: 45,
    border: 'none',
    borderRadius: 20,

    font: 'bold 16px "Montserrat", Helvetica, Arial, serif',
    color: 'white',
    backgroundColor: '#9104FF',
  },

  posts: {
    marginTop: 50,

    display: 'flex',
    flexDirection: 'column',
    gap: 30,
  },
})

function Media(params: { IconSrc: StyleDeclarationValue, IconAlt: string }) {
  return (
    <div className={css(sharedStyles.column)}>
      <div role="img" className={css(params.IconSrc)} title={params.IconAlt}>
        {/* <img className={css(mainStyles.mediaImg)} src={params.IconSrc} alt={params.IconAlt} /> */}
        {/* {params.IconAlt} */}
      </div>
    </div>
  )
}

type UserStatus =
  | ['ONLINE']
  | ['OFFLINE', Date]

type User = {
  UserCard: UserCard
  Status: UserStatus
}

type ContentItem =
  | ['TEXT', string]
  | ['IMG', string]

type Post = {
  Author: User
  Content: ContentItem []
  LikesCount: number
  ViewsCount: number
  CommentsCount: number
}

const postStyles = StyleSheet.create({
  container: {

  },
  header: {

  },
  content: {
    marginTop: 10,
  },
  footer: {
    marginTop: 10,
  },
  dots: {
    width: 32,
    height: '100%',
    backgroundColor: '#9104FF',
    mask: `url('${DotsIcon}') no-repeat center`,
  },

  footerItems: {
    display: 'flex',
    gap: 70,
  },
  footerItem: {
    display: 'flex',
    gap: 23,
    alignItems: 'center',
  },

  footerItemValue: {
    color: '#7A7A7A',
    font: 'bold 22px "Montserrat", Helvetica, Arial, serif',

  },

  like: {
    width: 34,
    height: 34,
    backgroundColor: '#9104FF',
    mask: `url('${HeartIcon}') no-repeat`,
    maskSize: 'cover',
  },
  comment: {
    width: 35,
    height: 33,
    fill: '#9104FF',
    backgroundColor: '#9104FF',
    mask: `url('${MessagesIcon}') no-repeat`,
    maskSize: 'cover',
  },
  repost: {
    width: 34,
    height: 34,
    backgroundColor: '#9104FF',
    mask: `url('${RepostIcon}') no-repeat center`,
    maskSize: 'cover',
  },
  view: {
    width: 40,
    height: 28,
    backgroundColor: '#9104FF',
    mask: `url('${EyeIcon}') no-repeat center`,
    maskSize: 'cover',
  },
})

function PostView(params: { post: Post }) {
  const { post } = params
  return (
    <div className={css(postStyles.container)}>
      <header className={css(postStyles.header)}>
        <div className={css(sharedStyles.level)}>
          <div className={css(sharedStyles.levelLeft)}>
            <UserCardView userCard={post.Author.UserCard} />
          </div>
          <div className={css(sharedStyles.levelRight)}>
            <div className={css(postStyles.dots)}></div>
          </div>
        </div>
      </header>

      <main className={css(postStyles.content)}>
        {post.Content.map((x, i) => {
          let res
          switch (x[0]) {
            case 'TEXT':
              res = (<div>{x[1]}</div>)
              break
            case "IMG":
              res = (
                <div className={css(sharedStyles.centerContainer)}>
                  <img src={x[1]} alt="img" />
                </div>
              )
              break
          }
          return (
            <div key={i}>{res}</div>
          )
        })}
      </main>

      <footer className={css(postStyles.footer)}>
        <div className={css(sharedStyles.level, sharedStyles.verticalCenter)}>
          <div className={css(sharedStyles.levelLeft)}>
            <div className={css(postStyles.footerItems)}>
              <div className={css(postStyles.footerItem)}>
                <div className={css(postStyles.like)} />
                <div className={css(postStyles.footerItemValue)}>{post.LikesCount}</div>
              </div>
              <div className={css(postStyles.footerItem)}>
                <div className={css(postStyles.comment)} />
                <div className={css(postStyles.footerItemValue)}>{post.CommentsCount}</div>
              </div>
              <div className={css(postStyles.footerItem)}>
                <div className={css(postStyles.repost)} />
              </div>
            </div>
          </div>
          <div className={css(sharedStyles.levelRight)}>
            <div className={css(postStyles.footerItem)}>
              <div className={css(postStyles.view)} />
              <div className={css(postStyles.footerItemValue)}>{post.ViewsCount}</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


function Main() {
  const posts: Post [] = [
    {
      Author: {
        UserCard: {
          Name: "lorem",
          Tag: "lorem",
          AvatarSrc: undefined,
          IsVerified: false,
        },
        Status: ['OFFLINE', new Date(Date.now() - 60000 * 6)],
      },
      Content: [
        ['IMG', 'https://picsum.photos/500/500'],
      ],
      LikesCount: 780,
      ViewsCount: 100,
      CommentsCount: 50,
    },
    {
      Author: {
        UserCard: {
          Name: "lorem2",
          Tag: "lorem2",
          AvatarSrc: undefined,
          IsVerified: false,
        },
        Status: ['OFFLINE', new Date(Date.now() - 60000 * 6)],
      },
      Content: [
        ['IMG', 'https://picsum.photos/500/500'],
      ],
      LikesCount: 780,
      ViewsCount: 100,
      CommentsCount: 50,
    },
  ]

  return (
    <div className={css(styles.mainContent)}>
      <div className={css(mainStyles.searchContainer)}>
        <img src={SearchIcon} alt="SearchIcon"/>
        <input className={css(mainStyles.searchInput)} placeholder="Search Durudex" />
      </div>

      <div className={css(mainStyles.container)}>

        <div className={css(mainStyles.container2)}>
          <div className={css(mainStyles.submitPost)}>
            <input className={css(mainStyles.submitInput)} placeholder="What’s new?" />

            <div className={css(mainStyles.submitFooter, sharedStyles.level)}>
              <div className={css(sharedStyles.levelLeft)}>
                <div className={css(mainStyles.mediaList, sharedStyles.columns)}>
                  <Media IconSrc={mainStyles.mediaGif} IconAlt="GifIcon" />
                  <Media IconSrc={mainStyles.mediaSmile} IconAlt="SmileIcon" />
                  <Media IconSrc={mainStyles.mediaPhoto} IconAlt="PhotoIcon" />
                  <Media IconSrc={mainStyles.mediaMic} IconAlt="MicIcon" />
                </div>
              </div>
              <div className={css(sharedStyles.levelRight)}>
                <button className={css(mainStyles.submitPublish)}>
                  Publish
                </button>
              </div>
            </div>
          </div>

          <div className={css(mainStyles.posts)}>
            {posts.map((post, i) => <PostView key={i} post={post} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const currentUserCard: UserCard = {
    // AvatarSrc: 'https://picsum.photos/128/128',
    AvatarSrc: undefined,
    Name: 'Taras Shevchenko',
    Tag: 'kobzar',
    IsVerified: false,
  }

  return (
    <div className={css(styles.container)}>
      <header className={css(styles.leftSidenav)}>
        <div className={css(styles.sidenav)}>
          <div className={css(styles.topSpace)} />
          <div className={css(styles.currentUserWrapper)}>
            <CurrentUserCardView userCard={ currentUserCard } />
          </div>
          <div className={css(styles.userAndItemsSpace)} />
          <div className={css(styles.sidenavItems)}>
            <SidenavItem name="Home" iconPath={HomeIcon} isActive={true} />
            <SidenavItem name="Notifications" iconPath={NotificationsIcon} isActive={false} />
            <SidenavItem name="Messages" iconPath={MessagesIcon} isActive={false} />
            <SidenavItem name="Community" iconPath={CommunityIcon} isActive={false} />
            <SidenavItem name="Photos" iconPath={PhotosIcon} isActive={false} />
            <SidenavItem name="Profile" iconPath={ProfileIcon} isActive={false} />
          </div>
          <div className={css(styles.itemSettingsSpace)} />
          <div className={css(styles.sidenavItemSettings)}>
            <SidenavItem name="Settings" iconPath={SettingsIcon} isActive={false} />
          </div>
          <div className={css(styles.bottomSpace)} />
        </div>
      </header>
      <div className={css(styles.mainContainer)}>
        <Main />
        <RightSidenav />
      </div>
    </div>
  )
}
