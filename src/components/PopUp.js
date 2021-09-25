import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close';
import { Grid, Typography } from '@mui/material'
import styled from '@emotion/styled'
import myAvatar from '../assets/myAvatar.png'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


const mediaBreakPoint = {
	mobile: '@media screen and (max-width: 568px)',
	tablet: '@media screen and (max-width: 899px)'
}

// Style All Components Of The Popup ---

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

const FloatingGrid = styled(Grid)`
	background: #fff;
	border-radius: 10px;
	color: #000;
	height: 80%;
	position: relative;
	max-height: 600px;
	max-width: 1400px;
	width: 80%;
	z-index: 5;

	${mediaBreakPoint.tablet} {
		height: 90%;
	}
`

const ContentBoxGrid = styled(Grid)`
	align-items: center;
	justify-content: center;
	max-height: 100%;
	max-width: 100%;
`

const StyledAvatar = styled.img`
	border-radius: 50%;
	box-shadow: 0 0 5px #1976D2;
	margin: auto;
	max-height: auto;
	max-width: 85%;

	${mediaBreakPoint.tablet} {
		margin-top: 20px;
		max-height: 165px;
		max-width: auto;
	}
`

const ResponsiveTypography = styled(Typography)`

	${mediaBreakPoint.tablet} {
		font-size: 90%;
	}
`

const ResponsiveHeaderTypography = styled(Typography)`

	${mediaBreakPoint.tablet} {
		font-size: 24px;
	}
`

const UnderlinedTypography = styled(Typography)`
	text-decoration: underline;

	${mediaBreakPoint.mobile} {
		font-size: 90%;
	}
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
	height: 40px;
	padding: 0;
	position: absolute;
	right: 20px;
	top: 20px;
	width: 40px;
	z-index: 6;
`

const PopUp = (props) => {

	return (
      <>
      {props.showPopUp ? (
				<BlurredBackground showPopUp={props.showPopUp} togglePopUp={props.togglePopUp}>
					<FloatingGrid container direction="row" showPopUp={props.showPopUp} boxShadow={18} alignItems="center">
						<ContentBoxGrid container item md={5}>
								<StyledAvatar alt="Xavier Marques" src={myAvatar} />
						</ContentBoxGrid>
						<ContentBoxGrid container item direction="column" md={6} m={1}>
							<Grid item mb={0} mt={2}>
								<ResponsiveHeaderTypography variant="h4" textAlign="center">Hallo, ich heiße</ResponsiveHeaderTypography>
							</Grid>
							<Grid item mb={2} mt={0}>
								<ResponsiveHeaderTypography color="primary" variant="h4" textAlign="center" >Xavier Marques</ResponsiveHeaderTypography>
							</Grid>
							<Grid item mb={2} mt={0}>
								<ResponsiveTypography variant="h5" textAlign="center" sx={{fontWeight: '520'}}>Schön dich kennenzulernen!</ResponsiveTypography>
							</Grid>
							<Grid item mb={2} mt={2}>
								<ResponsiveTypography variant="subtitle1" textAlign="center"> Thank you for checking out my project.</ResponsiveTypography>
							</Grid>
							<Grid item mb={2} mt={1}>
								<UnderlinedTypography variant="subtitle2" textAlign="center"> Find me on social media</UnderlinedTypography>
							</Grid>
							<Grid container item mt={1} direction="row" justifyContent="center">
								<Grid>
									<AnchorTagNoHightlight rel="noreferrer" href="https://www.linkedin.com/in/xavierpmarques/" target="_blank">
										<CustomLinkedInIcon fontSize="medium" />
									</AnchorTagNoHightlight>
								</Grid>
								<Grid mx={2}>
									<AnchorTagNoHightlight rel="noreferrer" href="https://github.com/xarmar" target="_blank">
										<CustomGitHubIcon fontSize="medium" />
									</AnchorTagNoHightlight>
								</Grid>
							</Grid>
						</ContentBoxGrid>
						<CloseButton aria-label='Close PopUp' md={1} onClick={() => {props.setShowPopUp(!props.showPopUp)}} />
					</FloatingGrid>
				</BlurredBackground>
      )
      : null
      }
			</>
  )
}

export default PopUp