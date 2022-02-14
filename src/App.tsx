import React, {useEffect, useState} from 'react';
import './App.css';
import {albumAPI, AlbumApiType} from "./API/album-api";
import {Box, FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent} from "@mui/material";
import Modal from "./Modal/Modal";


function App() {

    const [initialPhotos, setInitialPhotos] = useState<AlbumApiType[]>([])
    console.log(initialPhotos, 'data')
    const [page, setPage] = useState<number>(1)
    //const [loading, setLoading] = useState<boolean>(false)
    const [PER_PAGE] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [modalActive, setModalActive] = useState<boolean>(false)
    const [photoURL, setPhotoURL] = useState<string>()
    const [selectValue, setSelectValue] = useState<number>(0)
    const [albumId, setAlbumId] = useState<number[]>([])
    const [filteredById, setFilteredById] = useState<AlbumApiType[]>([])

    const paginateCounter = filteredById.length > 0 ? filteredById.length : initialPhotos.length
    const countPages = Math.ceil(paginateCounter / PER_PAGE);

    const handleChangePageNumber = (e: React.ChangeEvent<unknown>, p: number) => {
        setPage(p);
        setCurrentPage(p)
        //paginate(p)
    }

    useEffect(() => {
        //setLoading(true)
        albumAPI.getAllAlbum()
            .then((res) => {
                    setInitialPhotos(res.data)
                    let dataAlbumID = Array.from(new Set(res.data.map(d => d.albumId)))
                    setAlbumId(dataAlbumID)
                }
            )

        //setLoading(false)
    }, [])

    const lastIndex = currentPage * PER_PAGE
    const firstIndex = lastIndex - PER_PAGE
    //const currentPhotos = initialPhotos.slice(firstIndex, lastIndex)
    const currentPhotos = filteredById.length > 0 ? filteredById.slice(firstIndex, lastIndex) : initialPhotos.slice(firstIndex, lastIndex)

    console.log(currentPhotos, 'current photos')

    //const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    const handleModalData = (url: string) => {
        setPhotoURL(url)
        setModalActive(true)
    }

    const deletePhotoItem = (id: number) => {
        let deletedInitialPhotos = initialPhotos.filter((p) => p.id !== id)
        setInitialPhotos(deletedInitialPhotos)
        let deletedFilteredPhotos = filteredById.filter((p) => p.id !== id)
        setFilteredById(deletedFilteredPhotos)
    }

    const handleChangeAlbumId = (event: SelectChangeEvent) => {
        const albumID = +event.target.value
        setSelectValue(albumID)
        let filteredAlbumID = initialPhotos.filter((p) => p.albumId === albumID)
        console.log(filteredAlbumID, 'filtered by album id')
        setFilteredById(filteredAlbumID)
    };

    return (
        <div>
            <div className='select_list'>
                <Box sx={{minWidth: 199}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select ID</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectValue.toString()}
                            label="Album ID"
                            onChange={handleChangeAlbumId}
                        >
                            {albumId.map((id) =>
                                <MenuItem value={id}>{id}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <div className="pagination_list">
                <Pagination
                    variant="outlined"
                    shape="rounded"
                    count={countPages}
                    page={page}
                    onChange={(e, p) => handleChangePageNumber(e, p)}
                />
            </div>
            <div>
                <Modal
                    modalActive={modalActive}
                    setModalActive={setModalActive}
                    imgUrl={photoURL}
                />
                {currentPhotos.map((p) =>
                    <div className="gallery">
                        <div className="content">
                            <img
                                src={p.thumbnailUrl}
                                onClick={() => handleModalData(p.url)}
                            />
                            <p>{p.title}</p>
                            <button
                                className="buy-1"
                                onClick={() => deletePhotoItem(p.id)}
                            >
                                Delete Image
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App;


