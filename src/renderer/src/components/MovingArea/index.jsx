import { useEffect, useRef, useState } from "react";
import "./movingArea.scss";
import speechBubble from '@images/speechBubble.svg'

const movingItemList = [
    "아메리카노 주세요",
    "디카페인 커피 보여줘",
    "메뉴판 보여줘",
    "디저트메뉴 추천 좀 해줘",
    "뜨아 하나랑 아아 하나"
];

export default function MovingArea({ startOffset, position }) {
    const container = useRef(null);
    const trackRef = useRef(null);
    const [offset, setOffset] = useState(startOffset);

    function moveItems(offset, setOffset, trackRef, movingItemList) {
        if (trackRef.current && container.current) {
            const containerWidth = container.current.clientWidth;
            const containerPosition =
                position === "left"
                    ? container.current.getBoundingClientRect().left
                    : container.current.getBoundingClientRect().right; // 추가: 컨테이너의 왼쪽 위치
            const trackWidth = trackRef.current.clientWidth;

            switch (position) {
                case "right":
                    if (offset >= trackWidth - containerWidth) {
                        setOffset(containerWidth);
                    } else {
                        setOffset((prevOffset) => prevOffset + 1); // 오른쪽으로 한 픽셀 이동
                        moveFirstItemToLast(trackRef, containerPosition, setOffset);
                    }
                    break;
                case "left":
                    if (offset <= -(trackWidth - containerWidth)) {
                        setOffset(containerWidth);
                    } else {
                        setOffset((prevOffset) => prevOffset - 1); // 왼쪽으로 한 픽셀 이동

                        moveFirstItemToLast(trackRef, containerPosition, setOffset);
                    }
                    break;
            }
        }
    }

    function moveFirstItemToLast(trackRef, containerPosition, setOffset) {
        const movingItem = trackRef.current.getElementsByClassName("movingItem");
        const curLeft = parseInt(window.getComputedStyle(trackRef.current).left);
        const boxItem =
            position === "left" ? movingItem[0] : movingItem[movingItem.length - 1];
        const boxWidth = boxItem.offsetWidth;

        switch (position) {
            case "right":
                for (let i = movingItem.length - 1; i >= 0; i--) {
                    const boxElement = movingItem[i];
                    const boxElementLeft = boxElement.getBoundingClientRect().left;

                    if (boxElementLeft > containerPosition) {
                        // 조건 확인 후 이동 로직이 실행되지 않은 경우에만 실행
                        if (!boxElement.moved) {
                            boxElement.moved = true;
                            trackRef.current.prepend(boxElement);
                            setOffset(curLeft - boxWidth);
                        }
                    } else {
                        boxElement.moved = false;
                    }
                }
                break;
            case "left":
                for (let i = 0; i < movingItem.length; i++) {
                    const boxElement = movingItem[i];
                    const boxElementRight = boxElement.getBoundingClientRect().right;

                    if (boxElementRight < containerPosition) {
                        // 조건 확인 후 이동 로직이 실행되지 않은 경우에만 실행
                        if (!boxElement.moved) {
                            boxElement.moved = true;
                            trackRef.current.append(boxElement);
                            setOffset(curLeft + boxWidth);
                        }
                    } else {
                        boxElement.moved = false;
                    }
                }
                break;
        }
    }
    useEffect(() => {
        const moving = setInterval(() => {
            moveItems(offset, setOffset, trackRef, movingItemList);
        }, 30);

        return () => {
            clearInterval(moving);
        };
    }, [offset]);

    return (
        <>
            <div className="movingArea" ref={container}>
                <ul
                    className="movingTrack"
                    ref={trackRef}
                    style={{ left: `${offset}px` }}
                >
                    {movingItemList.map((item, index) => (
                        <li key={index} className="movingItem">
                            <div>
                                <img src={speechBubble} alt="speechBubble" />
                                <span>{item}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
