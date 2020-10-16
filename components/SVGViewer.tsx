import React from 'react';
import {View, Dimensions, ActivityIndicator} from 'react-native';
import ReactNativeSvgParser from '@target-corp/react-native-svg-parser';
import { getGlobalViewbox} from '@target-corp/react-native-svg-parser/src/converter';
import {
    clickElement,
    setSparepartsData,
    setSvgViewBox,
    setBottomSheetHeight, resetSelectedIDs
} from '@target-corp/react-native-svg-parser/src/actions/SvgModuleActionCreator';
import {connect} from 'react-redux';
import ImageZoom from 'react-native-image-pan-zoom';
import axios from 'axios';
import {showMessage} from '../common/common';
// import svgFile1 from '../svg/test.svg'
// import svgFile1 from '../svg/frame-3b.svg'
// import svgFile1 from '../svg/1419695882.svg'
// import svgFile1 from '../svg/1444762942.svg'
// import svgFile1 from '../svg/1307032260.svg'
// import svgFile1 from '../svg/birds/frame-1g.svg'
import svgFile1 from '../svg/Hen_and_chicks_cartoon_04_der.svg'
// import svgFile1 from '../svg/.svg'
// import svgFile1 from '../svg/.svg'
// import svgFile1 from '../svg/.svg'
// import svgFile1 from '../svg/.svg'
// import svgFile1 from '../svg/.svg'

interface SVGViewerProps {
    path?: string,
    sparepartsData: []
}

interface SVGViewerState {
}

class SVGViewer extends React.Component<SVGViewerProps, SVGViewerState> {
    svgNode = null;

    constructor(props: SVGViewerProps) {
        super(props);

        this.state = {
            screenWidth: Dimensions.get('window').width,
            screenHeight: Dimensions.get('window').height,
            imageWidth: 1,
            imageHeight: 1,
            initialScale: 1.0,
            svgLoaded: false,
        };
    }

    componentDidMount() {

        // this.loadSvgFileFromWeb('https://freesvg.org/download/3019');   // -- nie dziala
        // this.loadSvgFileFromWeb('');
        // this.loadSvgFileFromWeb('https://publicdomainvectors.org/download.php?file=1313084986.svg');
        // this.loadSvgFileFromWeb('https://publicdomainvectors.org/download.php?file=Cartoon-Animal-In-Airplane.svg');    //mysz w samolocie
        // this.loadSvgFileFromWeb('https://publicdomainvectors.org/download.php?file=lemmling_Cartoon_dog.svg');
        // this.loadSvgFileFromWeb('https://publicdomainvectors.org/download.php?file=14thWarrior-Cartoon-Elephant.svg');  //slonik
        // this.loadSvgFileFromWeb('https://publicdomainvectors.org/download.php?file=krowa.svg');  // do debugwania czemu nie wyswietla
        // this.loadSvgFileFromWeb('https://publicdomainvectors.org/download.php?file=bookworm.svg');
        // this.loadSvgFileFromWeb('https://publicdomainvectors.org/download.php?file=bts9.svg');
        // this.loadSvgFileFromWeb('https://publicdomainvectors.org/download.php?file=bts4.svg');
        // this.loadSvgFileFromWeb('https://publicdomainvectors.org/download.php?file=Children.svg');
        // this.loadSvgFileFromWeb('https://publicdomainvectors.org/download.php?file=lemmling-yak.svg');
        // this.loadSvgFileFromWeb('https://publicdomainvectors.org/download.php?file=Crocodile-Playing-Golf.svg');
        // this.loadSvgFileFromWeb('https://publicdomainvectors.org/download.php?file=frame-5c.svg');
        // this.loadSvgFileFromWeb('https://publicdomainvectors.org/download.php?file=daisy-the-cow.svg');
        // this.loadSvgFileFromWeb('https://publicdomainvectors.org/download.php?file=monkey-emojis-6.svg');
        // this.loadSvgFileFromWeb('https://publicdomainvectors.org/download.php?file=ankylosaurus_02.svg');
        // this.loadSvgFileFromWeb('https://publicdomainvectors.org/download.php?file=frame-2a.svg');
        // this.loadSvgFileFromWeb('https://publicdomainvectors.org/download.php?file=frame-2n.svg');
        // this.loadSvgFileFromWeb('https://publicdomainvectors.org/download.php?file=frame-1s.svg');
        // this.loadSvgFileFromWeb('https://publicdomainvectors.org/download.php?file=frame-3b.svg');
        this.parseSVGData(svgFile1);
        // this.loadSvgFileFromWeb('https://publicdomainvectors.org/download.php?file=owl-bike.svg');
        // this.loadSvgFileFromWeb('');
        // this.loadSvgFileFromWeb('');
        // this.loadSvgFileFromWeb('');
        // this.loadSvgFileFromWeb('');
        // this.loadSvgFileFromWeb('');
        // this.loadSvgFileFromWeb('');
        // this.loadSvgFileFromWeb('');
        // this.loadSvgFileFromWeb('');
        // this.loadSvgFileFromWeb('');
        // this.loadSvgFileFromWeb('');
        // this.loadSvgFileFromWeb('');
        // this.loadSvgFileFromWeb('');
        // this.loadSvgFileFromWeb('');
        // this.loadSvgFileFromWeb('');
        // this.loadSvgFileFromWeb('');
    }


    loadSvgFileFromWeb = (svgURI) => {
        const t1 = Date.now()
        axios
            .get(svgURI)
            .then(response => {
                console.log('Pobrano dane SVG z adresu: ', svgURI);
                const t2 = Date.now()
                console.log('Loading from WEB took: ', Math.floor((t2 - t1) / 1000), ' s')
                this.parseSVGData(response.data)
            })
            .catch(error => {
                console.log('!!!!!! Błąd pobierania pliku: ', svgURI, error);
                showMessage('Error loading file: ' + svgURI);
            });
    };

    parseSVGData = (svgData) => {
        const t1 = Date.now()
        // this.svgNode = ReactNativeSvgParser(svgData, '', {omitById:['base']}, this.props.clickElement);
        this.svgNode = ReactNativeSvgParser(svgData, '', {}, this.props.clickElement);
        const t2 = Date.now()
        console.log('Parsing SVG took: ', Math.floor((t2 - t1) / 1000), ' s')
// console.log(this.svgNode.props.dom.firstChild);
//         const svgViewBox1 = extractViewbox(this.svgNode.props.dom.firstChild).viewBox.split(' ');
//         console.log(svgViewBox1)
//         console.log(this.svgNode.props.dom.childNodes[4])

        // console.log(extractViewbox(this.svgNode.props.dom.childNodes[4]))
        // console.log('qqqq',getGlobalViewbox())
        // setTimeout(()=>console.log(getGlobalViewbox()), 0)

        // console.log(getGlobalViewbox(this.svgNode.props.dom))

        // const svgViewBox = [0, 0, 670, 330];
        const svgViewBox = getGlobalViewbox(this.svgNode.props.dom).viewBox.split(' ');
        console.log(svgViewBox)
        this.props.setSvgViewBox(svgViewBox);
        this.setState({
            svgLoaded: true,
            imageWidth: Math.round(svgViewBox[2]),
            imageHeight: Math.round(svgViewBox[3])
        }, this.getInitialScale);
    }

    getInitialScale = () => {
        const {imageWidth, imageHeight, screenWidth, screenHeight} = this.state;
        const scaleWidth = screenWidth / imageWidth;
        const scaleHeight = screenHeight / imageHeight;
        const initialScale = Math.min(scaleWidth, scaleHeight) * 0.8;
        this.setState({initialScale, loading: false});
    };

    render() {
        const {screenWidth, screenHeight, imageWidth, imageHeight, initialScale} = this.state;
        const svgMargin = 0;  //used as a fix for focusing on objects near borders

        return (
            <View style={{flex: 1}}>

                {!this.state.svgLoaded &&
                <View style={{justifyContent: 'center', height: screenHeight - this.props.bottomSheetHeight - 150}}>
                    <ActivityIndicator size="large"
                                       color={'orange'}/>
                </View>
                }

                {this.state.svgLoaded &&
                <ImageZoom
                    cropWidth={screenWidth}
                    cropHeight={screenHeight - 100}
                    imageWidth={imageWidth + 2 * svgMargin}
                    imageHeight={imageHeight + 2 * svgMargin}
                    // cropWidth={screenWidth-50}
                    // cropHeight={screenHeight - 100 - 150}
                    // imageWidth={300+2*svgMargin}
                    // imageHeight={300+2*svgMargin}
                    centerOn={{x: 0, y: 0, scale: initialScale, duration: 500}}
                    enableCenterFocus={false}
                    ref={this.props.svgImageZoomRef}
                    useNativeDriver={true}
                    // style={{backgroundColor:'gray'}}
                >
                    <View style={{margin: svgMargin}}>
                        {this.svgNode}
                    </View>
                    {/*<View style={{width:300, height:300, backgroundColor:'orange', borderColor:'red', borderWidth:2, margin:svgMargin}}></View>*/}
                </ImageZoom>
                }
            </View>);
    }
}

const mapStateToProps = (state) => {
    const {scrollViewRef, svgImageZoomRef, bottomSheetRef, bottomSheetHeaderPosition, bottomSheetHeight} = state.SvgModuleReducer;
    return {
        scrollViewRef,
        svgImageZoomRef,
        bottomSheetRef,
        bottomSheetHeaderPosition,
        bottomSheetHeight
    };
};
export default connect(mapStateToProps, {
    clickElement,
    setSparepartsData,
    setSvgViewBox,
    setBottomSheetHeight,
    resetSelectedIDs
})(SVGViewer);


