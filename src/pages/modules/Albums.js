import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, withRouter } from 'react-router-dom';
import { compose } from "recompose";
import { withFirebase } from "../../Firebase";
import { postApi, urlApi, urlApiNewPublic, postApiNew, urlList } from "../../pages/api/config.js";
import ReactPaginate from 'react-paginate';
import request from 'request-promise';
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
import makeRequest from "../api/config-request";
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
    const [albumId, setAlbumId] = useState(params.album)
    const [allUsers, setAllUsers] = useState(null)


    const [albumDetail, setAlbumDetail] = useState(null)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [total, setTotal] = useState(0)
    const [offset, setOffset] = useState("")
    const users = localStorage.getItem('userName')
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

    const [loading, setLoading] = useState(true)
    const [modal, setModal] = useState("modal hide")
    const [permissions, setPermissions] = useState([])
    const [checkAll, setCheckAll] = useState(false)
    const [play, setPlay] = useState(false)


    useEffect(async () => {
        await showData();
        await showAlbums();
        setLoading(false)
    }, [])

    const showData = async () => {
        const param = {
            timestamp: 1627282250000,
            albumId: albumId,

        }
        const headers = {
            userId: userId,
            token: token,
        }
        await makeRequest("get", urlList().URL_ALBUM.LIST_SONG, param, headers, {
        })
            .then(({ data }) => {
                if (data.data) {
                    setAllUsers(data.data);

                }

            })
            .catch((err) => {
                console.log("++++++++++++++++", err);
            });


    }

    const showArtist = async () => {
        const param = {
            timestamp: 1627282250000,
            albumId: albumId,

        }
        const headers = {
            userId: userId,
            token: token,
        }
        await makeRequest("get", urlList().URL_ALBUM.LIST_SONG, param, headers, {
        })
            .then(({ data }) => {
                if (data.data) {
                    setAllUsers(data.data);

                }

            })
            .catch((err) => {
                console.log("++++++++++++++++", err);
            });


    }

    const showAlbums = async () => {
        const param = {
            timestamp: 1627282250000,
            albumId: albumId,

        }
        const headers = {
            userId: userId,
            token: token,
        }

        await makeRequest("get", urlList().URL_ALBUM.DETAIL, param, headers, {
        })
            .then(({ data }) => {
                if (data.data) {
                    setAlbumDetail(data.data);
                }

            })
            .catch((err) => {
                console.log("++++++++++++++++", err);
            });

    }
    const letPlay = () => {
        setPlay(!play)
    }
    const handleEdit = (row) => {
        history.push({
            pathname: '/users/edit',
            search: '?query=' + row.token
        });
    }

    const like = async (albumName, albumAvatar) => {

        const param = {
            timestamp: 1627282250000,
            albumId: albumId,
            userName: users,
            action: "LIKE",
            albumName: albumName,
            albumAvatar: albumAvatar
        }

        const headers = {
            userId: userId,
            token: token,
        }
        await makeRequest("post", urlList().URL_ALBUM.LIKE, param, headers, {
        })
            .then(({ data }) => {
                if (data.data) {
                    showAlbums()
                }

            })
            .catch((err) => {
                console.log("++++++++++++++++", err);
            });

    }


    const unLike = async (albumName, albumAvatar) => {
        const param = {
            timestamp: 1627282250000,
            albumId: albumId,
            userName: users,
            action: "UNLIKE",
            albumName: albumName,
            albumAvatar: albumAvatar
        }

        const headers = {
            userId: userId,
            token: token,
        }

        await makeRequest("post", urlList().URL_ALBUM.LIKE, param, headers, {
        })
            .then(({ data }) => {
                if (data.data) {
                    showAlbums()
                }

            })
            .catch((err) => {
                console.log("++++++++++++++++", err);
            });

    }


    const LoadMore = async () => {
        // const url = urlList().URL_USER.ALL
        // const data = { limit: limit, token: token, status: ['Active', 'Pause'], username: username, offset: offset }
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

            {loading ? <Loader type="Puff"
                color="#00BFFF"
                height={100}
                width={100} /> : albumDetail ?
                <>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', height: 'auto', marginBottom: '5%' }}>


                        <div style={{ width: 'fit-content' }}>
                            <img src={albumDetail.avatar}
                                style={{ width: '240px', height: 'auto', marginRight: '15px' }}
                            />
                        </div>
                        <div style={{ width: 'auto', display: 'flex', flexDirection: 'column', height: 'auto', }}>
                            <div style={{ fontSize: '12px', color: '#B3B3B3' }}>Album</div>
                            <div style={{ fontSize: '48px', color: 'white' }}>{albumDetail.albumName}</div>
                            <div style={{ fontSize: '12px', color: '#B3B3B3' }}>{albumDetail.numberOfSongs} bài hát - bởi
                                {albumDetail.artists && albumDetail.artists.map((row, index) => (
                                    <a> {index != albumDetail.artists.length - 1 ? " " + row.realName + "," : " " + row.realName} </a>
                                ))}

                            </div>
                        </div>
                    </div>

                    <div style={{ width: '100%' }} >
                        <div style={{ color: 'white', fontSize: '22px', display: 'flex', flexDirection: 'row' }}>
                            <div>
                                <button className="btnPlay" style={{ marginLeft: '10px' }} onClick={letPlay}>{!play ? <img src={require('../../assets/play.png')} className="imgPlay" /> :
                                    <img src={require('../../assets/pause.png')} className="imgPlay" />}</button>
                            </div>
                            <div style={{ width: '24px', marginLeft: '10px', marginTop: '5px' }} >
                                {albumDetail.isLike == 0 ? <img src={require('../../assets/like.png')} style={{ width: '24px' }} onClick={() => like(albumDetail.albumName, albumDetail.avatar)} /> :
                                    <img src={require('../../assets/like-solid.png')} style={{ width: '24px' }} onClick={() => unLike(albumDetail.albumName, albumDetail.avatar)} />}
                            </div>
                        </div>
                    </div>

                </> : ''
            }
            <Divider my={6} />
            <Card mb={6}>
                <Paper style={{ backgroundColor: '#121212' }}>

                    <Table>

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
                                width={100} /> : allUsers && allUsers.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="left"

                                            style={{ color: 'white', backgroundColor: '#121212', borderBottom: '0px' }}>

                                            {index == 0 ? <p style={{ color: 'green', fontSize: '25px' }}> {index + 1} </p> :
                                                index == 1 ? <p style={{ color: 'blue', fontSize: '25px' }}> {index + 1} </p> :
                                                    index == 2 ? <p style={{ color: 'pink', fontSize: '25px' }}> {index + 1} </p>

                                                        : <p > {index + 1} </p>}




                                        </TableCell>
                                        <TableCell align="left"

                                            style={{ color: 'white', backgroundColor: '#121212', borderBottom: '0px' }}>

                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <img className="upRate" src={require('../../assets/up.png')} />
                                                <p> {index + 1} </p>
                                            </div>





                                        </TableCell>
                                        <TableCell align="left" style={{ color: 'white', backgroundColor: '#121212', borderBottom: '0px' }}>
                                            <div style={{ marginRight: '15px', height: '100%', display: 'flex', flexDirection: 'row' }}>
                                                <img src={row.avatar}
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
                                            <img src={require('../../assets/like.png')} className="cardProductBtnLike" />
                                            <img src={require('../../assets/more.png')} className="cardProductBtnLike" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    {total >= limit ? <a className="btn btn-primary LoadMore" color="secondary" style={{ backgroundColor: '#121212' }} onClick={() => LoadMore()}>Xem thêm</a> : ''}

                </Paper>
            </Card>
            <div className="cardContainer">
                <div className="titleList">
                    <div style={{ color: 'white', fontSize: '2.3rem', fontWeight: '700', float: 'left', marginTop: '-10px' }}>
                        Nghệ sĩ tham gia
                    </div>
                </div>
                <div className="listCard" >
                    {/* {
                        loading ? <Loader type="Puff"
                            color="#00BFFF"
                            height={100}
                            width={100} /> : albumDetail.artists && albumDetail.artists.map((rowChild, indexChild) => (


                                <div >

                                    {indexChild > 5 ? '' :
                                        <div className="cardProduct" >
                                            <div className="cardProductImgBtn" >
                                                <img src={rowChild.avatar} className="cardProductImg"
                                                />
                                                <div className="cardProductBtn">
                                                    <img src={require('../../assets/like.png')} className="cardProductBtnLike" />
                                                    <button className="cardProductBtnPlay" onClick={letPlay}>
                                                        {!play ? (<img src={require('../../assets/play.png')} className="cardProductImgPlay" />) : (<img src={require('../../assets/pause.png')} className="cardProductImgPlay" />)}
                                                    </button>
                                                    <img src={require('../../assets/more.png')} className="cardProductBtnMore" />
                                                </div>
                                            </div>
                                            <div className="cardProductTitle"  >
                                                {rowChild.realName}
                                            </div>
                                        </div>
                                    }

                                </div>

                            ))} */}

                </div>
            </div>
        </>
    );
}




function UsersList({ history, location, firebase }) {

    const gotoAdd = () => {
        history.push({
            pathname: '/users/form',
            search: ''
        });
    }

    let params = queryString.parse(location.search)
    const [textSearch, setTextSearch] = useState(params.username)

    const onChange = event => {
        setTextSearch(event.target.value)
    }


    const Submit = () => {
        window.location.href = '/users/list?username=' + textSearch
    }
    return (
        <React.Fragment>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <UsersTable history={history} firebase={firebase} location={location} />

                </Grid>
            </Grid>
        </React.Fragment>
    );
}

const InvestListComponent = compose(
    withRouter,
    // withFirebase
)(UsersList);

export default InvestListComponent;

// export default UsersList;
