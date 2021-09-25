import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close';
import { Grid, Typography } from '@mui/material'
import styled from '@emotion/styled'
import myAvatar from '../assets/myAvatar.png'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Set styling for blurred background
const BlurredBackground = styled(Box)`
	align-items: center;
	background-color: rgba(0,0,0,0.6);
	display: flex;
	height: 100%;
	justify-content: center;
	position: fixed;
	width: 100%;
	z-index: 2;
`

// Must find out how to add media query to @emotion styling, height must increase when device size is smaller - TODO
const FloatingGrid = styled(Grid)`
	position: relative;
	color: #000;
	z-index: 5;
	border-radius: 10px;
	background: #fff;
	width: 70%;
	height: 70%;
	max-width: 1400px;
	max-height: 600px;

	&@media screen and (max-width: 899px) {
		height: 900px;
	}
`

const ContentBoxGrid = styled(Grid)`
	align-items: center;
	justify-content: center;
	box-sizing: content-box;
	max-height: 100%;
	max-width: 100%;
`

// Must find out how to add media query to @emotion styling, margin-top must increase when device size is smaller - TODO
const StyledAvatar = styled.img`
	box-shadow: 0 0 5px #1976D2;
	box-sizing: border-box;
	margin: auto;
	border-radius: 50%;
	max-height: auto;
	max-width: 70%;

	&@media screen and (max-width: 899px) {
		margin-top: 50px;
	}
`

const UnderlinedTypography = styled(Typography)`
	text-decoration: underline;
`

const AnchorTagNoHightlight = styled.a`
	color: black;
`

const CustomGitHubIcon = styled(GitHubIcon)`
	&:hover {
		color: #1976D2;
		cursor: pointer;
	}
`

const CustomLinkedInIcon = styled(LinkedInIcon)`
	&:hover {
		color: #1976D2;
		cursor: pointer;
	}
`

const CloseButton = styled(CloseIcon)`
	cursor: pointer;
	position: absolute;
	top: 20px;
	right: 20px;
	width: 40px;
	height: 40px;
	padding: 0;
	z-index: 6;
`


const PopUp = (props) => {

  return (
      <>
      {props.showPopUp ? (
				<BlurredBackground showPopUp={props.showPopUp} togglePopUp={props.togglePopUp}>
					<FloatingGrid container direction="row" showPopUp={props.showPopUp} boxShadow={18}>
						<ContentBoxGrid container item md={6}>
								<StyledAvatar alt="Xavier Marques" src={myAvatar} />
						</ContentBoxGrid>
						<ContentBoxGrid container item direction="column" md={6}>
							<Grid item m={2} mb={0}>
								<Typography variant="h4" textAlign="center">Hallo, ich bin</Typography>
							</Grid>
							<Grid item m={2} mt={0}>
								<Typography color="primary" variant="h4" textAlign="center" >Xavier Marques</Typography>
							</Grid>
							<Grid item m={2} mt={0}>
								<Typography variant="h5" textAlign="center" sx={{fontWeight: '520'}}>Schön dich kennenzulernen!</Typography>
							</Grid>
							<Grid item m={2} mt={2}>
								<Typography variant="subtitle1" textAlign="center"> Thank you for checking out my project.</Typography>
							</Grid>
							<Grid item m={2} mt={1}>
								<UnderlinedTypography variant="subtitle2" textAlign="center"> Find me on social media</UnderlinedTypography>
							</Grid>
							<Grid container item m={2} mt={1} direction="row" justifyContent="center">
								<Grid mx={2}>
									<AnchorTagNoHightlight rel="noreferrer" href="https://www.linkedin.com/in/xavierpmarques/" target="_blank">
										<CustomGitHubIcon fontSize="medium" />
									</AnchorTagNoHightlight>
								</Grid>
								<Grid mx={2}>
									<AnchorTagNoHightlight rel="noreferrer" href="https://github.com/xarmar" target="_blank">
										<CustomLinkedInIcon fontSize="medium" />
									</AnchorTagNoHightlight>
								</Grid>
							</Grid>
						</ContentBoxGrid>
						<CloseButton aria-label='Close PopUp' onClick={() => {props.setShowPopUp(!props.showPopUp)}} />
					</FloatingGrid>
				</BlurredBackground>
      )
      : null
      }
			</>
  )
}

export default PopUp