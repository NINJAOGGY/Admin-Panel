import Board, { moveCard, moveColumn, removeCard, addCard } from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import useBoard from '../../store/Board';
import './Board.css';
import { RxCross2 } from 'react-icons/rx';
import { IoMdAdd } from 'react-icons/io';
import AddCardModel from '../../components/AddCardModel/AddCardModel';
import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import api from '../../utils/axiosConfig';

const BoardPage = () => {
    const { board, setBoard } = useBoard();
    const { getToken } = useAuth();
    
    // Fetch board data when component mounts
    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const token = await getToken();
                const response = await api.get('/board', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBoard(response.data);
            } catch (error) {
                console.error('Error fetching board:', error);
            }
        };

        fetchBoard();
    }, [getToken]);

    // Update board in backend whenever it changes
    const updateBackendBoard = async (newBoard) => {
        try {
            const token = await getToken();
            await api.put('/board', newBoard, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Error updating board:', error);
        }
    };

    const handleColumnMove = (_card, source, destination) => {
        const updatedBoard = moveColumn(board, source, destination);
        setBoard(updatedBoard);
        updateBackendBoard(updatedBoard);
    };

    const handleCardMove = (_card, source, destination) => {
        const updatedBoard = moveCard(board, source, destination);
        setBoard(updatedBoard);
        updateBackendBoard(updatedBoard);
    };

    const getColumn = (card) => {
        const column = board.columns.filter((column) => column.cards.includes(card));
        return column[0];
    };

    const getGradient = (card) => {
        const column = getColumn(card);
        const title = column?.title;
        switch (title) {
            case "TODO":
                return {
                    background: "linear-gradient(65.35deg, rgba(65,65,65,0.67) -1.72%, rgba(48,189,220) 163.54%)"
                };
            case "Doing":
                return {
                    background: "linear-gradient(65.35deg, rgba(65,65,65,0.67) -1.72%, rgba(220,48,48) 163.54%)"
                };
            case "Completed":
                return {
                    background: "linear-gradient(65.35deg, rgba(65,65,65,0.67) -1.72%, rgba(48,220,86) 163.54%)"
                };
            case "Backlog":
                return {
                    background: "linear-gradient(65.35deg, rgba(65,65,65,0.67) -1.72%, rgba(134,48,220) 163.54%)"
                };
            default:
                return {
                    background: "linear-gradient(65.35deg, rgba(65,65,65,0.67) -1.72%, rgba(134,48,220) 163.54%)"
                };
        }
    };
    

    // Rest of your code remains the same...

    return (
        <div className='board-c'>
            <span>Trello Board</span>
            <Board
                allowAddColumn
                allowRenameColumn
                allowRemoveCard
                onCardDragEnd={handleCardMove}
                onColumnDragEnd={handleColumnMove}
                renderCard={(props) => (
                    <div className='kb-card' style={getGradient(props)}>
                        <div>
                            <span>{props.title}</span>
                            <button 
                                className='rem-btn' 
                                type='button'
                                onClick={() => {
                                    const updatedBoard = removeCard(board,
                                        getColumn(props),
                                        props
                                    );
                                    setBoard(updatedBoard);
                                    updateBackendBoard(updatedBoard);
                                }}
                            >
                                <RxCross2 color='white' size={15} />
                            </button>
                        </div>
                        <span>{props.description}</span>
                    </div>
                )}
                renderColumnHeader={(props) => {
                    const [modelOpened, setModelOpened] = useState(false);

                    const handleCardAdd = async (title, detail) => {
                        const card = {
                            id: new Date().getTime().toString(),
                            title,
                            description: detail
                        };

                        const updatedBoard = addCard(board, props, card);
                        setBoard(updatedBoard);
                        updateBackendBoard(updatedBoard);
                        setModelOpened(false);
                    };

                    return (
                        <div className='col-head'>
                            <span>{props.title}</span>
                            <IoMdAdd
                                color='white'
                                size={25}
                                title='Add card'
                                onClick={() => setModelOpened(true)}
                            />
                            <AddCardModel 
                                visible={modelOpened}
                                handleCardAdd={handleCardAdd}
                                onClose={() => setModelOpened(false)} 
                            />
                        </div>
                    );
                }}
            >
                {board}
            </Board>
        </div>
    );
};

export default BoardPage;