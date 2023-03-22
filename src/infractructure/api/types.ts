export interface SignupData {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

export interface SigninData {
  login: string,
  password: string
}

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface ChatData {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message?: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    },
    time: string;
    content: string
  }
}

export interface Message {
  chat_id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  }
}
