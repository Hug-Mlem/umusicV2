import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, withRouter } from 'react-router-dom';
import { compose } from "recompose";
import { withFirebase } from "../../Firebase";
import { postApi, urlApi, urlApiNewPublic, postApiNew, urlList } from "../../pages/api/config.js";
import ReactPaginate from 'react-paginate';
import request from 'request-promise'
import JSAlert from 'js-alert';
import queryString from 'query-string';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import './style.css';
import makeRequest from "../api/config-request";
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

    const letPlay = async () => {
        await setPlay(!play);
    }
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
        makeRequest("get", urlList().URL_TYPE.ALL, param, headers, {
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

    const handleEdit = (row) => {
        history.push({
            pathname: '/users/edit',
            search: '?query=' + row.token
        });
    }
    const onclickAlbums = (row) => {
        history.push({
            pathname: '/umusic/album',
            search: '?album=' + row.id
        });

    }
    const onclickPlaylist= (row) => {
        history.push({
            pathname: '/umusic/playlist/',
            search: '?query=' + row.id
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
                width={100} /> : allUsers && allUsers.map((row, index) => (
                    <div className="cardContainer">
                        <div className="titleList">
                            <div style={{ color: 'white', fontSize: '2.3rem', fontWeight: '700', float: 'left', marginTop: '-10px' }}>
                                {row.collectionName}
                            </div>
                            <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: '700', float: 'right' }}>
                                <a href="https://www.google.cm"> Tất cả </a>
                            </div>
                        </div>
                        <div className="listCard" >
                            {row.items && row.items.map((rowChild, indexChild) => (
                                <div >

                                    {indexChild > 5 ? '' :
                                        <div className="cardProduct" >
                                            <div className="cardProductImgBtn" >
                                                <img src={(rowChild.avatar && rowChild.avatar.includes('medias') == true) ? 'http://103.143.206.63:8004'+rowChild.avatar : rowChild.avatar} className="cardProductImg" 
                                                onClick={() => {rowChild.itemType === 'album' ?  onclickAlbums(rowChild) : onclickPlaylist(rowChild)}} />
                                                <div className="cardProductBtn">
                                                    <img src={require('../../assets/like.png')} className="cardProductBtnLike" />
                                                    <button className="cardProductBtnPlay" onClick={letPlay}>
                                                        {!play ? (<img src={require('../../assets/play.png')} className="cardProductImgPlay" />) : (<img src={require('../../assets/pause.png')} className="cardProductImgPlay" />)}
                                                    </button>
                                                    <img src={require('../../assets/more.png')} className="cardProductBtnMore" />
                                                </div>
                                            </div>
                                            <div className="cardProductTitle" onClick={() => {rowChild.itemType === 'album' ?  onclickAlbums(rowChild) : onclickPlaylist(rowChild)}} >
                                                {rowChild.itemName}
                                            </div>
                                        </div>
                                    }

                                </div>

                            ))}

                        </div>

                    </div>
                )
                )

            }


        </>



    );
}

function UsersList({ history, location, firebase }) {

    let params = queryString.parse(location.search)
    const [textSearch, setTextSearch] = useState(params.username)

    return (
        <React.Fragment >
            {/* <Divider my={6} /> */}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <UsersTable history={history} firebase={firebase} location={location} />
                </Grid>
            </Grid>

        </React.Fragment >
    );
}

const InvestListComponent = compose(
    withRouter,
    // withFirebase
)(UsersList);

export default InvestListComponent;

// export default UsersList;
