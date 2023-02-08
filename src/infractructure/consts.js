import defaultAvatarUrl from "../assets/img/user.png";
import avatarUserUrl from "../assets/img/avatar.png";
import createChatIcon from "../assets/icons/create-chat.svg"
import addUserIcon from "../assets/icons/add.svg";
import deleteUserIcon from "../assets/icons/delete-user.svg";
import deleteChatIcon from "../assets/icons/delete-chat.svg";
import imagesIcon from "../assets/icons/images.svg";
import fileIcon from "../assets/icons/file.svg";
import locationIcon from "../assets/icons/location.svg";

export const dialogs = [
    {
        avatar: defaultAvatarUrl,
        name: "Андрей",
        message: "Привет",
        messageCount: 4,
        time: "10:49"
    },
    {
        avatar: defaultAvatarUrl,
        name: "тет-а-теты",
        message: "И Human Interface Guidelines и Material Design рекомендуют И Human Interface Guidelines и Material Design рекомендуют",
        messageCount: 2,
        time: "Ср"
    },
    {
        avatar: avatarUserUrl,
        name: "Илья",
        message: "Друзья, у меня для вас особенный выпуск новостей!",
        messageCount: 0,
        time: "Пн"
    },
    {
        avatar: defaultAvatarUrl,
        name: "Илья",
        message: "Друзья, у меня для вас особенный выпуск новостей!",
        messageCount: 0,
        time: "Пн"
    },
    {
        avatar: avatarUserUrl,
        name: "Илья",
        message: "Друзья, у меня для вас особенный выпуск новостей!",
        messageCount: 0,
        time: "Пн"
    },
    {
        avatar: defaultAvatarUrl,
        name: "Илья",
        message: "Друзья, у меня для вас особенный выпуск новостей!",
        messageCount: 0,
        time: "Пн"
    },
    {
        avatar: avatarUserUrl,
        name: "Илья",
        message: "Друзья, у меня для вас особенный выпуск новостей!",
        messageCount: 0,
        time: "Пн"
    },
    {
        avatar: defaultAvatarUrl,
        name: "Илья",
        message: "Друзья, у меня для вас особенный выпуск новостей!",
        messageCount: 0,
        time: "Пн"
    },
    {
        avatar: avatarUserUrl,
        name: "Илья",
        message: "Друзья, у меня для вас особенный выпуск новостей!",
        messageCount: 0,
        time: "Пн"
    },
    {
        avatar: defaultAvatarUrl,
        name: "Илья",
        message: "Друзья, у меня для вас особенный выпуск новостей!",
        messageCount: 0,
        time: "Пн"
    },
    {
        avatar: defaultAvatarUrl,
        name: "Илья",
        message: "Друзья, у меня для вас особенный выпуск новостей!",
        messageCount: 0,
        time: "Пн"
    },
    {
        avatar: avatarUserUrl,
        name: "Илья",
        message: "Друзья, у меня для вас особенный выпуск новостей!",
        messageCount: 0,
        time: "Пн"
    }
]

export const addChatItems = [
    {
        icon: createChatIcon,
        label: "Создать чат"
    }
]

export const pointsItems = [
    {
        icon: addUserIcon,
        label: "Добавить пользователя"
    },
    {
        icon: deleteUserIcon,
        label: "Удалить пользователя",
        delete: true
    },
    {
        icon: deleteChatIcon,
        label: "Удалить чат",
        delete: true
    }
]

export const attachItems = [
    {
        icon: imagesIcon,
        label: "Фото или видео"
    },
    {
        icon: fileIcon,
        label: "Файл"
    },
    {
        icon: locationIcon,
        label: "Локация"
    }
]