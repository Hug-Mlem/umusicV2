import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, withRouter } from 'react-router-dom';
import { compose } from "recompose";
import { withFirebase } from "../../Firebase";
import { postApi, urlApi, urlApiNewPublic, postApiNew, urlList } from "../../pages/api/config.js";
import makeRequest from "../api/config-request";

import JSAlert from 'js-alert';
import queryString from 'query-string';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import {
    Grid,
    Card as MuiCard,
    Divider as MuiDivider,
    Paper as MuiPaper,
    Button as MuiButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Checkbox
} from "@material-ui/core";
import './stylePersonal.css';
import {
    Add as AddIcon, TrainRounded
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";

import Moment from 'react-moment';

import { permissionServices, permissionList } from "../users/UserUtils"
import "../users/users.css"

Moment.globalFormat = 'YYYY-MM-DD HH:mm:ss';
const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Button = styled(MuiButton)(spacing);
// Data
let id = 1;

const limit = 100
function UsersTable({ history, firebase, location }) {
    let params = queryString.parse(location.search)
    const [allUsers, setAllUsers] = useState(null)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [total, setTotal] = useState(0)
    const [offset, setOffset] = useState("")
    const users = localStorage.getItem('userName')
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const [loading, setLoading] = useState(true)
    const [modal, setModal] = useState("modal hide")

    const [checkAll, setCheckAll] = useState(false)
    const [play, setPlay] = useState(false)


    useEffect(() => {


        showData()

    }, [])

    const showData = async () => {

        const param = {
            timestamp: 1627282250000,
            page: 0,
            size: 10,
        }
        const headers = {
            userId: userId,
            token: token,
        }

        makeRequest("get", urlList().URL_PERSONAL.LIKE_SONG, param, headers, {
        })
            .then(({ data }) => {
                if (data.data) {
                    setAllUsers(data.data);
                    setLoading(false);
                }

            })
            .catch((err) => {
                console.log("++++++++++++++++", err);
            });

    }
    const letPlay = () => {
        setPlay(!play)
    }
    const setUnlike = () => {

    }
    const handleEdit = (row) => {
        history.push({
            pathname: '/users/edit',
            search: '?query=' + row.token
        });
    }

    const handleDelete = async (row) => {
        const url = urlList().URL_USER.DELETE
        const dataApi = { user_id: row.id, token: token }
        const result = await postApiNew('POST', url, dataApi)
        setLoadingDelete(false)
        if (result.code == 200) {
            const data = []
            allUsers.map((rowArr) => {
                if (row._id !== rowArr._id) {
                    data.push(rowArr)
                }
            })
            setAllUsers(data)
            JSAlert.alert('<code>Xóa thành công</code>', null, JSAlert.Icons.Success);
        } else {
            JSAlert.alert('<code>Xóa thất bại</code>', null, JSAlert.Icons.Failed);
            return false;
        }
    };



    const LoadMore = async () => {
        // const url = urlList().URL_USER.ALL

        // const result = await postApiNew('POST', url, data)
        // const dataArr = []
        // for (const [key, value] of Object.entries(allUsers)) {
        //     dataArr.push(value)
        // }
        // if (result.data && result.data.data) {
        //     for (const [key, value] of Object.entries(result.data.data)) {
        //         dataArr.push(value)
        //     }
        //     setOffset(result.data.last_offset)
        // }
        // setTotal(result.data.total)
        // setAllUsers(dataArr)
        // setLoading(false)
    }



    return (
        <>
            <div style={{ width: '100%' }} >
                <button className="btnPlay" onClick={letPlay}>{!play ? <img src={require('../../assets/play.png')} className="imgPlay" /> :
                    <img src={require('../../assets/pause.png')} className="imgPlay" />}</button>
                <Button
                    variant="contained"
                    style={{ borderRadius: '50rem', backgroundColor: 'orange', color: 'black', marginRight: '10px', float: 'right', zIndex: 1 }}
                    component={Link}
                    to="/sign-in"
                >
                    Mua Vip
                </Button>
            </div>

            <Card mb={6}>
                <Paper style={{ backgroundColor: '#121212' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ color: 'white', backgroundColor: '#121212' }}>#</TableCell>
                                <TableCell style={{ color: 'white', backgroundColor: '#121212' }}>Bài hát</TableCell>
                                <TableCell style={{ color: 'white', backgroundColor: '#121212' }}>Thời lượng</TableCell>
                                <TableCell style={{ color: 'white', backgroundColor: '#121212' }}>Tuỳ chọn</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loadingDelete ? <div className="waitting">
                                <Loader type="Puff"
                                    color="#00BFFF"
                                    height={100}
                                    width={100} />
                            </div> : ''}


                            {loading ? <Loader type="Puff"
                                color="#00BFFF"
                                height={100}
                                width={100} /> : (allUsers.length != 0) ? allUsers && allUsers.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="left" style={{ color: 'white', backgroundColor: '#121212', borderBottom: '0px' }}>{index + 1}</TableCell>
                                        <TableCell align="left" style={{ color: 'white', backgroundColor: '#121212', borderBottom: '0px' }}>
                                            <div style={{ marginRight: '15px', height: '100%', display: 'flex', flexDirection: 'row' }}>
                                                <img src={"http://103.143.206.63:8004" + row.avatar}
                                                    style={{ width: '30px', height: '30px', marginRight: '15px' }}
                                                />
                                                <div>
                                                    {row.songName}
                                                </div>

                                            </div>


                                        </TableCell>
                                        <TableCell align="left" style={{ color: 'white', backgroundColor: '#121212', borderBottom: '0px' }}>{row.duration}</TableCell>
                                        <TableCell align="left" style={{ color: 'white', backgroundColor: '#121212', borderBottom: '0px' }}>
                                            <img src={require('../../assets/lyrics.png')} className="cardProductBtnLike" />
                                            <img src={require('../../assets/like-solid.png')} className="cardProductBtnLike" />
                                            <img src={require('../../assets/more.png')} className="cardProductBtnLike" />
                                        </TableCell>
                                    </TableRow>
                                ))
                                :
                                <div style={{ width: '100%', color: 'white', fontSize: '30px', marginLeft: '80%', marginTop: '20%' }}>Danh sách trống </div>
                            }
                        </TableBody>
                    </Table>
                    {total >= limit ? <a className="btn btn-primary LoadMore" color="secondary" style={{ backgroundColor: '#121212' }} onClick={() => LoadMore()}>Xem thêm</a> : ''}
                </Paper>
            </Card>
        </>
    );
}



function Playlist({ history, firebase, location }) {
    const [play, setPlay] = useState(false)
    const [allUsers, setAllUsers] = useState(null)
    const users = localStorage.getItem('userName')
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        showData()
    }, [])

    const letPlay = () => {
        setPlay(!play)
    }
    const showData = async () => {

        const param = {
            timestamp: 1627282250000,
            page: 0,
            size: 10,
        }
        const headers = {
            userId: userId,
            token: token,

        }
        makeRequest("get", urlList().URL_PERSONAL.PLAYLIST, param, headers, {
        })
            .then(({ data }) => {
                if (data) {
                    setAllUsers(data.data);
                    setLoading(false);
                }

            })
            .catch((err) => {
                console.log("++++++++++++++++", err);
            });

    }

    return (
        <>
            <div className="listCard" >
                <div className="cardProductPlus" >

                    <img src={require('../../assets/plus.svg')} className="cardProductBtnPlus" />

                </div>
                {loading ? <Loader type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100} /> : allUsers && allUsers.map((row, index) => (
                        <div className="cardProduct" >
                            <div className="cardProductImgBtn">
                                <img src={row.avatar.includes('medias') == true ? 'http://103.143.206.63:8004'+ row.avatar : row.avatar} className="cardProductImg" />
                                <div className="cardProductBtn">
                                    <img src={require('../../assets/like.png')} className="cardProductBtnLike" />
                                    <button className="cardProductBtnPlay" onClick={letPlay}>
                                        {!play ? (<img src={require('../../assets/play.png')} className="cardProductImgPlay" />) : (<img src={require('../../assets/pause.png')} className="cardProductImgPlay" />)}
                                    </button>
                                    <img src={require('../../assets/more.png')} className="cardProductBtnMore" />
                                </div>
                            </div>
                            <div className="cardProductTitle" >
                                {row.playlistName}
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
}




function Artist({ history, firebase, location }) {
    const [play, setPlay] = useState(false)
    const [allUsers, setAllUsers] = useState(null)
    const users = localStorage.getItem('userName')
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        showData()
    }, [])

    const letPlay = () => {
        setPlay(!play)
    }
    const showData = async () => {

        const param = {
            timestamp: 1627282250000,
            page: 0,
            size: 10,
        }
        const headers = {
            userId: userId,
            token: token,

        }
        makeRequest("get", urlList().URL_PERSONAL.ARTIST, param, headers, {
        })
            .then(({ data }) => {
                if (data) {
                    setAllUsers(data.data);
                    setLoading(false);
                }

            })
            .catch((err) => {
                console.log("++++++++++++++++", err);
            });

    }

    return (
        <>
            <div className="listCard" >
                {loading ? <Loader type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100} /> : allUsers && allUsers.map((row, index) => (



                        <div className="cardProduct" >
                            <div className="cardProductImgBtn">
                                <img src="https://picsum.photos/seed/picsum/200" className="cardProductImg" />
                                <div className="cardProductBtn">
                                    <img src={require('../../assets/like.png')} className="cardProductBtnLike" />
                                    <button className="cardProductBtnPlay" onClick={letPlay}>
                                        {!play ? (<img src={require('../../assets/play.png')} className="cardProductImgPlay" />) : (<img src={require('../../assets/pause.png')} className="cardProductImgPlay" />)}
                                    </button>
                                    <img src={require('../../assets/more.png')} className="cardProductBtnMore" />
                                </div>
                            </div>
                            <div className="cardProductTitle" >
                               
                            </div>
                        </div>
                    ))}


            </div>
        </>
    );
}



function Album({ history, firebase, location }) {

    const [play, setPlay] = useState(false)
    const [allUsers, setAllUsers] = useState(null)
    const users = localStorage.getItem('userName')
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        showData()
    }, [])

    const letPlay = () => {
        setPlay(!play)
    }
    const showData = async () => {

        const param = {
            timestamp: 1627282250000,
            page: 0,
            size: 10,
        }
        const headers = {
            userId: userId,
            token: token,

        }
        makeRequest("get", urlList().URL_PERSONAL.ALBUMS, param, headers, {
        })
            .then(({ data }) => {
                if (data) {
                
                    setAllUsers(data.data);
                    setLoading(false);
                }

            })
            .catch((err) => {
                console.log("++++++++++++++++", err);
            });

    }

    return (
        <>
            <div className="listCard" >
                {loading ? <Loader type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100} /> : allUsers && allUsers.map((row, index) => (
                        <div className="cardProduct" >
                            <div className="cardProductImgBtn">
                                <img src={"http://103.143.206.63:8004"+ row.avatar} className="cardProductImg" />
                                <div className="cardProductBtn">
                                    <img src={require('../../assets/like.png')} className="cardProductBtnLike" />
                                    <button className="cardProductBtnPlay" onClick={letPlay}>
                                        {!play ? (<img src={require('../../assets/play.png')} className="cardProductImgPlay" />) : (<img src={require('../../assets/pause.png')} className="cardProductImgPlay" />)}
                                    </button>
                                    <img src={require('../../assets/more.png')} className="cardProductBtnMore" />
                                </div>
                            </div>
                            <div className="cardProductTitle" >
                               {row.albumName}
                            </div>
                        </div>
                    ))}


            </div>
        </>
    );
}


function UsersList({ history, location, firebase }) {
    const width = window.innerWidth;
    const height = window.innerHeight
    const [switchPage, setSwitchPage] = useState(1);
    const token = localStorage.getItem('token');
    const gotoAdd = () => {
        history.push({
            pathname: '/users/form',
            search: ''
        });
    }
    useEffect(() => {

        if (token === '') {
            JSAlert.alert('<code>Bạn phải đăng nhập để vào mục nào</code>', null, JSAlert.Icons.Failed);
        }
    }, [])

    let params = queryString.parse(location.search)
    const [textSearch, setTextSearch] = useState(params.username)

    const onChange = event => {
        setTextSearch(event.target.value)
    }

    const switchPages = (number) => {
        setSwitchPage(number);
    }

    const Submit = () => {
        window.location.href = '/users/list?username=' + textSearch
    }
    return (
        <React.Fragment>
            {!token ?
                <>
                    <div style={{
                        width: '100%', height: 'auto', zIndex: 99, backgroundColor: '#282828', borderRadius: '50rem', display: 'flex', flexDirection: 'row',
                        //  position: 'fixed' 
                    }}></div>
                </>
                :
                <>

                    <div style={{
                        width: '100%', height: 'auto', zIndex: 99, backgroundColor: '#282828', borderRadius: '50rem', display: 'flex', flexDirection: 'row',
                        //  position: 'fixed' 
                    }}>
                        <div style={{ width: '5%' }}></div>

                        <Button
                            className={switchPage == 1 ? "btnActivePages" : "btnSwitchPages"}
                            variant="contained"
                            onClick={() => switchPages(1)}
                        >
                            Bài hát
                        </Button>

                        <Button
                            variant="contained"
                            className={switchPage == 2 ? "btnActivePages" : "btnSwitchPages"}
                            onClick={() => switchPages(2)}



                        >
                            Playlist
                        </Button>
                        <Button
                            variant="contained"
                            className={switchPage == 3 ? "btnActivePages" : "btnSwitchPages"}

                            onClick={() => switchPages(3)}



                        >
                            Nghệ sĩ
                        </Button>
                        <Button
                            variant="contained"
                            className={switchPage == 4 ? "btnActivePages" : "btnSwitchPages"}
                            onClick={() => switchPages(4)}

                        >
                            Album
                        </Button>
                        <div style={{ width: '5%' }}></div>

                    </div>
                    <Divider my={5} />

                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            {switchPage == 1 ? <UsersTable history={history} firebase={firebase} location={location} /> :
                                switchPage == 2 ? <Playlist history={history} firebase={firebase} location={location} /> :
                                    switchPage == 3 ? <Artist history={history} firebase={firebase} location={location} /> :
                                        switchPage == 4 ? <Album history={history} firebase={firebase} location={location} />
                                            : ''
                            }

                        </Grid>
                    </Grid>
                </>
            }
        </React.Fragment>
    );
}

const InvestListComponent = compose(
    withRouter,
    // withFirebase
)(UsersList);

export default InvestListComponent;

// export default UsersList;
