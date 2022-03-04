import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, withRouter } from 'react-router-dom';
import { compose } from "recompose";
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

} from "@material-ui/core";
import './stylePersonal.css';

import { spacing } from "@material-ui/system";
import SwipeableViews from 'react-swipeable-views';
import Moment from 'react-moment';

import "../users/users.css"

Moment.globalFormat = 'YYYY-MM-DD HH:mm:ss';
const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Button = styled(MuiButton)(spacing);
// Data
let id = 1;

const limit = 10
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
    const [permissions, setPermissions] = useState([])
    const [checkAll, setCheckAll] = useState(false)
    const [play, setPlay] = useState(false)


    useEffect(() => {
        showData()
    }, [])

    const showData = async () => {
        const param = {
            timestamp: 1627282250000,
            page: 0,
            size: 5,
        }
        const headers = {
            userId: userId,
            token: token,
        }

        makeRequest("get", urlList().URL_RANK.ALL, param, headers, {
        })
            .then(({ data }) => {
                if (data.data) {
                    setAllUsers(data.data[0].items);
                    setLoading(false);
                }

            })
            .catch((err) => {
                console.log("++++++++++++++++", err);
            });
        // setLoading(false)
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

    const handleHistory = async (row) => {
        window.location.href = "/user/history?token=" + row.token
    };

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
            <div style={{ width: '100%' }} >
                <div style={{ color: 'white', fontSize: '22px' }} >
                    Bảng xếp hạng

                    <button className="btnPlay" style={{ marginLeft: '10px' }} onClick={letPlay}>{!play ? <img src={require('../../assets/play.png')} className="imgPlay" /> : <img src={require('../../assets/pause.png')} className="imgPlay" />}</button>
                </div>


            </div>

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
        </>
    );
}



function FirstList({ history, firebase, location }) {
    let params = queryString.parse(location.search)
    const [allUsers, setAllUsers] = useState(null)
    const [vn, setVN] = useState(null)
    const [us, setUS] = useState(null)
    const [kpop, setKpop] = useState(null)
    const [lao, setLao] = useState(null)
    const [thai, setThai] = useState(null)

    const [loadingDelete, setLoadingDelete] = useState(false)
    const [total, setTotal] = useState(0)
    const [offset, setOffset] = useState("")
    const users = localStorage.getItem('userName')
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const [loading, setLoading] = useState(true)
    const [username, setsearch] = useState(params.username)
    const [modal, setModal] = useState("modal hide")
    const [permissions, setPermissions] = useState([])
    const [checkAll, setCheckAll] = useState(false)
    const [play, setPlay] = useState(false)


    useEffect(() => {
        showData()
    }, [])

    const showData = async () => {
        const param = {
            timestamp: 1627282250000,
            page: 0,
            size: 5,
        }
        const headers = {
            userId: userId,
            token: token,
        }

        makeRequest("get", urlList().URL_RANK.ALL, param, headers, {
        })
            .then(({ data }) => {
                if (data.data) {
                    setAllUsers(data.data);
                    setLao(data.data[1].items);
                    setThai(data.data[2].items);
                    setVN(data.data[3].items);
                    setUS(data.data[4].items);
                    setKpop(data.data[5].items);
                    setLoading(false);
                }

            })
            .catch((err) => {
                console.log("++++++++++++++++", err);
            });
        // setLoading(false)
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
    const handleAgency = async (row) => {
        const url = urlList().URL_AGENCY.CREATE
        const dataApi = { user_id: row.id, token: token }
        const result = await postApiNew('POST', url, dataApi)
        setLoadingDelete(false)
        if (result.code == 200) {
            JSAlert.alert('<code>Kích hoạt thành công</code>', null, JSAlert.Icons.Success);
        } else {
            JSAlert.alert('<code>Kích hoạt thất bại</code>', null, JSAlert.Icons.Failed);
            return false;
        }
    };

    const handleUpdateStatus = async (status, row, type) => {
        const url = urlList().URL_USER.UPDATE
        let dataApi = { user_id: row.id, status: status, token: token }
        if (status == 1 || status == 2) {
            status = status == 2 ? true : false
            if (type == "auto") {
                dataApi = { user_id: row.id, is_warranty_auto: status, token: token }
            } else {
                dataApi = { user_id: row.id, is_warranty: status, token: token }
            }
        }
        const result = await postApiNew('POST', url, dataApi)
        setLoadingDelete(false)
        if (result.code == 200) {
            const data = [...allUsers]
            data.map((rowArr) => {
                if (row.id === rowArr.id) {
                    if (type == "auto") {
                        rowArr.is_warranty_auto = result.data.is_warranty_auto
                    } else {
                        rowArr.is_warranty = result.data.is_warranty
                    }
                }
            })
            setAllUsers(data)
            JSAlert.alert('<code>cập nhật thành công</code>', null, JSAlert.Icons.Success);
        } else {
            JSAlert.alert('<code>cập nhật thất bại</code>', null, JSAlert.Icons.Failed);
            return false;
        }
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
            <div style={{ width: '100%' }} >
                <div style={{ color: 'white', fontSize: '22px' }}>
                    Bảng xếp hạng tuần
                </div>


            </div>
            <Divider my={6} />

            <Card mb={6}>
                <SwipeableViews enableMouseEvents disableLazyLoading= {true}>
                    
                    <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#121212' }}>

                        <Paper style={{ backgroundColor: '#181818', width: '30%', marginRight: '5%', marginLeft: '2px' }}>
                            <div style={{ color: 'white', fontSize: '22px', display: 'flex', flexDirection: 'row' }}>
                                <div style={{ marginLeft: '6%', marginTop: '4%' }}> Việt Nam </div>
                                <button className="btnPlay" style={{ marginLeft: '10px', marginTop: '4%' }} onClick={letPlay}>{!play ? <img src={require('../../assets/play.png')} className="imgPlay" /> : <img src={require('../../assets/pause.png')} className="imgPlay" />}</button>
                            </div>
                            <Divider my={6} />
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
                                        width={100} /> : vn && vn.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left"

                                                    style={{ color: 'white', backgroundColor: '#181818', borderBottom: '0px' }}>

                                                    {index == 0 ? <p style={{ color: 'green', fontSize: '25px' }}> {index + 1} </p> :
                                                        index == 1 ? <p style={{ color: 'blue', fontSize: '25px' }}> {index + 1} </p> :
                                                            index == 2 ? <p style={{ color: 'pink', fontSize: '25px' }}> {index + 1} </p>

                                                                : <p > {index + 1} </p>}




                                                </TableCell>
                                                <TableCell align="left"

                                                    style={{ color: 'white', backgroundColor: '#181818', borderBottom: '0px' }}>

                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <img className="upRate" src={require('../../assets/up.png')} />
                                                        <p> {index + 1} </p>
                                                    </div>





                                                </TableCell>
                                                <TableCell align="left" style={{ color: 'white', backgroundColor: '#181818', borderBottom: '0px' }}>
                                                    <div style={{ marginRight: '15px', height: '100%', display: 'flex', flexDirection: 'row' }}>
                                                        <img src={row.avatar}
                                                            style={{ width: '30px', height: '30px', marginRight: '15px' }}
                                                        />
                                                        <div>
                                                            {row.songName}
                                                        </div>

                                                    </div>


                                                </TableCell>

                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            {total >= limit ? <a className="btn btn-primary LoadMore" color="secondary" style={{ backgroundColor: '#181818' }} onClick={() => LoadMore()}>Xem thêm</a> : ''}

                        </Paper>
                        <Paper style={{ backgroundColor: '#181818', width: '30%', marginRight: '5%' }}>
                            <div style={{ color: 'white', fontSize: '22px', display: 'flex', flexDirection: 'row' }}>
                                <div style={{ marginLeft: '6%', marginTop: '4%' }}> US-UK </div>
                                <button className="btnPlay" style={{ marginLeft: '10px', marginTop: '4%' }} onClick={letPlay}>{!play ? <img src={require('../../assets/play.png')} className="imgPlay" /> : <img src={require('../../assets/pause.png')} className="imgPlay" />}</button>
                            </div>
                            <Divider my={6} />
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
                                        width={100} /> : us && us.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left"

                                                    style={{ color: 'white', backgroundColor: '#181818', borderBottom: '0px' }}>

                                                    {index == 0 ? <p style={{ color: 'green', fontSize: '25px' }}> {index + 1} </p> :
                                                        index == 1 ? <p style={{ color: 'blue', fontSize: '25px' }}> {index + 1} </p> :
                                                            index == 2 ? <p style={{ color: 'pink', fontSize: '25px' }}> {index + 1} </p>

                                                                : <p > {index + 1} </p>}




                                                </TableCell>
                                                <TableCell align="left"

                                                    style={{ color: 'white', backgroundColor: '#181818', borderBottom: '0px' }}>

                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <img className="upRate" src={require('../../assets/up.png')} />
                                                        <p> {index + 1} </p>
                                                    </div>





                                                </TableCell>
                                                <TableCell align="left" style={{ color: 'white', backgroundColor: '#181818', borderBottom: '0px' }}>
                                                    <div style={{ marginRight: '15px', height: '100%', display: 'flex', flexDirection: 'row' }}>
                                                        <img src={row.avatar}
                                                            style={{ width: '30px', height: '30px', marginRight: '15px' }}
                                                        />
                                                        <div>
                                                        {row.songName}
                                                        </div>

                                                    </div>


                                                </TableCell>

                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            {total >= limit ? <a className="btn btn-primary LoadMore" color="secondary" style={{ backgroundColor: '#181818' }} onClick={() => LoadMore()}>Xem thêm</a> : ''}

                        </Paper>
                        <Paper style={{ backgroundColor: '#181818', width: '30%' ,height: '100%' }}>
                            <div style={{ color: 'white', fontSize: '22px', display: 'flex', flexDirection: 'row' }}>
                                <div style={{ marginLeft: '6%', marginTop: '4%' }}> K-Pop </div>
                                <button className="btnPlay" style={{ marginLeft: '10px', marginTop: '4%' }} onClick={letPlay}>{!play ? <img src={require('../../assets/play.png')} className="imgPlay" /> : <img src={require('../../assets/pause.png')} className="imgPlay" />}</button>
                            </div>
                            <Divider my={6} />
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
                                        width={100} /> : kpop && kpop.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left"

                                                    style={{ color: 'white', backgroundColor: '#181818', borderBottom: '0px' }}>

                                                    {index == 0 ? <p style={{ color: 'green', fontSize: '25px' }}> {index + 1} </p> :
                                                        index == 1 ? <p style={{ color: 'blue', fontSize: '25px' }}> {index + 1} </p> :
                                                            index == 2 ? <p style={{ color: 'pink', fontSize: '25px' }}> {index + 1} </p>

                                                                : <p > {index + 1} </p>}




                                                </TableCell>
                                                <TableCell align="left"

                                                    style={{ color: 'white', backgroundColor: '#181818', borderBottom: '0px' }}>

                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <img className="upRate" src={require('../../assets/up.png')} />
                                                        <p> {index + 1} </p>
                                                    </div>





                                                </TableCell>
                                                <TableCell align="left" style={{ color: 'white', backgroundColor: '#181818', borderBottom: '0px' }}>
                                                    <div style={{ marginRight: '15px', height: '100%', display: 'flex', flexDirection: 'row' }}>
                                                        <img src={row.avatar}
                                                            style={{ width: '30px', height: '30px', marginRight: '15px' }}
                                                        />
                                                        <div>
                                                        {row.songName}
                                                        </div>

                                                    </div>


                                                </TableCell>

                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            {total >= limit ? <a className="btn btn-primary LoadMore" color="secondary" style={{ backgroundColor: '#181818' }} onClick={() => LoadMore()}>Xem thêm</a> : ''}

                        </Paper>

                    </div>


                    <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#121212' }}>

                        <Paper style={{ backgroundColor: '#181818', width: '30%', marginRight: '5%' ,marginLeft: '10px' }}>
                            <div style={{ color: 'white', fontSize: '22px', display: 'flex', flexDirection: 'row' }}>
                                <div style={{ marginLeft: '6%', marginTop: '4%' }}> Lào </div>
                                <button className="btnPlay" style={{ marginLeft: '10px', marginTop: '4%' }} onClick={letPlay}>{!play ? <img src={require('../../assets/play.png')} className="imgPlay" /> : <img src={require('../../assets/pause.png')} className="imgPlay" />}</button>
                            </div>
                            <Divider my={6} />
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
                                        width={100} /> : lao && lao.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left"

                                                    style={{ color: 'white', backgroundColor: '#181818', borderBottom: '0px' }}>

                                                    {index == 0 ? <p style={{ color: 'green', fontSize: '25px' }}> {index + 1} </p> :
                                                        index == 1 ? <p style={{ color: 'blue', fontSize: '25px' }}> {index + 1} </p> :
                                                            index == 2 ? <p style={{ color: 'pink', fontSize: '25px' }}> {index + 1} </p>

                                                                : <p > {index + 1} </p>}




                                                </TableCell>
                                                <TableCell align="left"

                                                    style={{ color: 'white', backgroundColor: '#181818', borderBottom: '0px' }}>

                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <img className="upRate" src={require('../../assets/up.png')} />
                                                        <p> {index + 1} </p>
                                                    </div>





                                                </TableCell>
                                                <TableCell align="left" style={{ color: 'white', backgroundColor: '#181818', borderBottom: '0px' }}>
                                                    <div style={{ marginRight: '15px', height: '100%', display: 'flex', flexDirection: 'row' }}>
                                                        <img src={row.avatar}
                                                            style={{ width: '30px', height: '30px', marginRight: '15px' }}
                                                        />
                                                        <div>
                                                            {row.songName}
                                                        </div>

                                                    </div>


                                                </TableCell>

                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            {total >= limit ? <a className="btn btn-primary LoadMore" color="secondary" style={{ backgroundColor: '#181818' }} onClick={() => LoadMore()}>Xem thêm</a> : ''}

                        </Paper>
                        <Paper style={{ backgroundColor: '#181818', width: '30%', marginRight: '5%' }}>
                            <div style={{ color: 'white', fontSize: '22px', display: 'flex', flexDirection: 'row' }}>
                                <div style={{ marginLeft: '6%', marginTop: '4%' }}> Thailand </div>
                                <button className="btnPlay" style={{ marginLeft: '10px', marginTop: '4%' }} onClick={letPlay}>{!play ? <img src={require('../../assets/play.png')} className="imgPlay" /> : <img src={require('../../assets/pause.png')} className="imgPlay" />}</button>
                            </div>
                            <Divider my={6} />
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
                                        width={100} /> : thai && thai.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left"

                                                    style={{ color: 'white', backgroundColor: '#181818', borderBottom: '0px' }}>

                                                    {index == 0 ? <p style={{ color: 'green', fontSize: '25px' }}> {index + 1} </p> :
                                                        index == 1 ? <p style={{ color: 'blue', fontSize: '25px' }}> {index + 1} </p> :
                                                            index == 2 ? <p style={{ color: 'pink', fontSize: '25px' }}> {index + 1} </p>

                                                                : <p > {index + 1} </p>}




                                                </TableCell>
                                                <TableCell align="left"

                                                    style={{ color: 'white', backgroundColor: '#181818', borderBottom: '0px' }}>

                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <img className="upRate" src={require('../../assets/up.png')} />
                                                        <p> {index + 1} </p>
                                                    </div>





                                                </TableCell>
                                                <TableCell align="left" style={{ color: 'white', backgroundColor: '#181818', borderBottom: '0px' }}>
                                                    <div style={{ marginRight: '15px', height: '100%', display: 'flex', flexDirection: 'row' }}>
                                                        <img src={row.avatar}
                                                            style={{ width: '30px', height: '30px', marginRight: '15px' }}
                                                        />
                                                        <div>
                                                        {row.songName}
                                                        </div>

                                                    </div>


                                                </TableCell>

                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            {total >= limit ? <a className="btn btn-primary LoadMore" color="secondary" style={{ backgroundColor: '#181818' }} onClick={() => LoadMore()}>Xem thêm</a> : ''}

                        </Paper>
                        

                    </div>
                </SwipeableViews>

            </Card>
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
                    <FirstList history={history} firebase={firebase} location={location} />
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
