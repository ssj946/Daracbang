import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { backApiInstance, jwtApiInstance } from "./http";
import { ResponseDataType } from "./responseType";
import { MemberInfo } from "../store/memberReducer";
import { getToken } from "../utils/tokenUtil";


const http = backApiInstance();
const jwtHttp = jwtApiInstance();

export const getGuestBook = async (ownerId: number): Promise<AxiosResponse<GuestBookObject>> => {
    const GET_GUESTBOOK = "/api/guestbooks/"+ownerId;
    const token = getToken();
    return await http.get(GET_GUESTBOOK, {
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    });
  };

  export const writeGuestBook = async (ownerId: number, entry: GuestBookEntry) => {
    const POST_GUESTBOOK = "/api/guestbooks/"+ownerId;
    const token = getToken();
    return await http.post(POST_GUESTBOOK, 
        {
            content: entry.content
        }, 
        {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        }
    );
};

export const deleteGuestBook = async (guestbookId: number) => {
    const DELETE_GUESTBOOK = "/api/guestbooks/"+guestbookId;
    const token = getToken();
    try {
        await http.delete(DELETE_GUESTBOOK, 
            {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            }
        );
        alert("방명록이 삭제되었습니다.");
        const event = new CustomEvent('deleteSuccess', { detail: guestbookId });
        window.dispatchEvent(event);
    } catch (error) {
        alert("방명록을 삭제할 권한이 없습니다.");
        console.error("Failed to delete post:", error);
    }
};

export class GuestBookEntry {
    content: string;

    constructor(content: string) {
        this.content = content;
    }
}
  
export class GuestBookItem {
    guestBookId: number;
    nickname: string;
    writerId: number;
    profileImage: string;
    content: string;
    createdAt: string;

    constructor(guestBookId: number, nickname: string, writerId: number, profileImage: string, content: string, createdAt: string) {
        this.guestBookId = guestBookId;
        this.nickname = nickname;
        this.writerId = writerId;
        this.profileImage = profileImage;
        this.content = content;
        this.createdAt = createdAt;
    }
}

export class GuestBookObject {
    message: string;
    lastId: number;
    datas: GuestBookItem[];

    constructor(message: string, lastId: number, datas: GuestBookItem[]) {
        this.message = message;
        this.lastId = lastId;
        this.datas = datas;
    }
}
