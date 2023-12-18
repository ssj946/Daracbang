import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { Badge } from "@mui/material";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";

import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { MoodTrackerItemType, getMoodTracker } from "../api/diaryApi";
import styled from "@emotion/styled";
import { getSentimentDiaryEmozi } from "../utils/getSentimentEmozi";

export type MoodTackerProps = {
  memberId: number;
  onClickTracker: (diary: MoodTrackerItemType) => void;
};
const initDay = dayjs();

const MoodTracker: React.FC<MoodTackerProps> = ({ memberId, onClickTracker }: MoodTackerProps) => {
  const [year, setYear] = useState<number>(initDay.get("year"));
  const [month, setMonth] = useState<number>(initDay.get("month") + 1);
  const [diaryDay, setDiaryDay] = useState<MoodTrackerItemType[] | []>([]); //  day를 가져옴
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleMonthChange = (date: Dayjs) => {
    setYear(date.get("year"));
    setMonth(date.get("month") + 1);
  };

  useEffect(() => {
    setMonth((cur) => cur);

    setIsLoading(true);
    getMoodTrackerItems();
  }, [month]);

  async function getMoodTrackerItems() {
    const response = await getMoodTracker(memberId, year, month);
    setDiaryDay(response.data.moodTracker);
    setIsLoading(false);
  }

  function MoodTrackerItem(props: PickersDayProps<Dayjs> & { diaryDay?: MoodTrackerItemType[] }) {
    const { diaryDay = [], day, outsideCurrentMonth, ...other } = props;
    let isSelected = !props.outsideCurrentMonth;
    let selectedDiary: MoodTrackerItemType | null = null;
    if (isSelected) {
      const result = diaryDay.filter((value) => dayjs(value.createdAt).get("date") === day.get("date"));
      if (result.length === 0) {
        isSelected = false;
      } else {
        selectedDiary = result[0];
      }
    }

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={
          isSelected ? (
            <EmoziWrapper select={false}>
              <EmoziImg
                src={getSentimentDiaryEmozi(selectedDiary!.sentiment)}
                alt="sentiment"
                onClick={() => {
                  if (selectedDiary != null) {
                    onClickTracker(selectedDiary);
                  }
                }}
              />
            </EmoziWrapper>
          ) : undefined
        }
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        sx={{
          height: "275px", '& .MuiPickersCalendarHeader-root': { marginTop: "8px", marginBottom: 0 },
          '& .MuiPickersFadeTransitionGroup-root-MuiDateCalendar-viewTransitionContainer': { height: "200px" }
        }}
        slots={{
          day: MoodTrackerItem,
        }}
        loading={isLoading}
        renderLoading={() => <DayCalendarSkeleton />}
        slotProps={{
          day: {
            diaryDay,
          } as any,
        }}
        defaultValue={initDay}
        onMonthChange={handleMonthChange}
      />
    </LocalizationProvider>
  );
};

export default MoodTracker;
const EmoziWrapper = styled.div<{ select: boolean }>`
  position: relative;
  left: -13px;
  top: 13px;
  border: ${(props) => (props.select ? "2px solid #ac23ec" : "none")};
`;

const EmoziImg = styled.img`
  width: 39px;
  height: 39px;
  cursor: pointer;
`;
