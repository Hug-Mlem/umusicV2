import React from "react";
import styled from "styled-components";

import {
  Grid,
  Hidden,
  List,
  ListItemText,
  ListItem as MuiListItem
} from "@material-ui/core";



const Wrapper = styled.div`
  padding: ${props => props.theme.spacing(1) / 4}px
    ${props => props.theme.spacing(4)}px;
  background: ${props => props.theme.palette.common.white};
  position: fixed;
  left : 0px;
  top: 90%;
  height: 10%;
  z-Index : 100001;
  width: 100%;


`;

const ListItem = styled(MuiListItem)`
  display: inline-block;
  width: auto;
  padding-left: ${props => props.theme.spacing(2)}px;
  padding-right: ${props => props.theme.spacing(2)}px;

  &,
  &:hover,
  &:active {
    color: #000;
  }
`;

function Footer() {
  return (
    <Wrapper>
      <Grid container spacing={0}>
        <Hidden smDown>
          <Grid container item xs={12} md={6}>
            <List>
              <ListItem component="a" href="#">
                <ListItemText primary="Support" />
              </ListItem>
              <ListItem component="a" href="#">
                <ListItemText primary="Help Center" />
              </ListItem>
              <ListItem component="a" href="#">
                <ListItemText primary="Privacy" />
              </ListItem>
              <ListItem component="a" href="#">
                <ListItemText primary="Terms of Service" />
              </ListItem>
            </List>
          </Grid>
        </Hidden>
        <Grid container item xs={12} md={6} justify="flex-end">
          <List>
            <ListItem>
              <ListItemText primary="© 2019 - AutoFarmer" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Footer;
