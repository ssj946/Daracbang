import { Button, Card, Typography } from '@mui/material';
import * as React from 'react';
import Sun from '../assets/images/sun.png';
import styled from "@emotion/styled";
import { GuestBookItem, deleteGuestBook } from '../api/guestBookApi';
import { formatDate } from "../utils/dateUtil";
import deleteIcon from '../assets/images/delete.png';

interface NeighPostProps {
    data: GuestBookItem;
}

export default function NeighPost({ data }: NeighPostProps) {




    return (
        <Card style={{ position: 'relative', height: "100px", width: "600px", marginLeft: "50px", marginTop: "15px" }}>
            <Typography style={{ height: "20px", marginLeft: "10px", fontFamily: "omyu_pretty", fontWeight: "bold" }} >{formatDate(data.createdAt)}</Typography>
            <NeighInfo style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}>
                <img src={data.profileImage} alt='profile' style={{ height: "20px", marginLeft: "10px" }} />
                <Typography style={{ fontFamily: "omyu_pretty", fontWeight: "bold", marginLeft: "10px" }}>{data.nickname}</Typography>
            </NeighInfo>
            <Typography style={{ fontFamily: "KyoboHand", marginLeft: "10px", marginTop: "5px" }}>{data.content}</Typography>
            <Button onClick={() => deleteGuestBook(data.guestBookId)} style={{ position: "absolute", right: -20, top: 0 }}>
                <img src={deleteIcon} alt="delete" style={{ width: '10px', height: '10px' }}/> 
            </Button>
        </Card>
    );
}

const NeighInfo = styled.div`

`;