
                let markers = [];
                let infos = [];
                let contentString = [];

                let initialize = () => {

                    let mapOptions = {
                        "center": new google.maps.LatLng(-12.9548276,34.1524764),
                        "zoom": 7,
                        "mapTypeId": google.maps.MapTypeId.ROADMAP
                    };

                    let myMap = new google.maps.Map(document.getElementById('mapArea'),
                        mapOptions);
                        
                    markers[0] = new google.maps.Marker({
                                icon: '//chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff0000',
                                position: new google.maps.LatLng(-15.0315681, 34.7811371),
                                map: myMap,
                                title:'2'
                            });
                            contentString[0] = "<div style=color:black;font-size:10px>[object Object]</div>";
                            infos[0] = new google.maps.InfoWindow({
                                content: contentString[0]
                            });
                            markers[0].addListener('click', function(){
                                for (i = 0; i < infos.length; i++) {
                                    if (infos[i] != null) { infos[i].close(); }
                                }
                                infos[0].open(myMap, markers[0]);
                            });markers[1] = new google.maps.Marker({
                                icon: '//chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff0000',
                                position: new google.maps.LatLng(-15.7762085, 35.0307655),
                                map: myMap,
                                title:'3'
                            });
                            contentString[1] = "<div style=color:black;font-size:10px>[object Object]</div>";
                            infos[1] = new google.maps.InfoWindow({
                                content: contentString[1]
                            });
                            markers[1].addListener('click', function(){
                                for (i = 0; i < infos.length; i++) {
                                    if (infos[i] != null) { infos[i].close(); }
                                }
                                infos[1].open(myMap, markers[1]);
                            });markers[2] = new google.maps.Marker({
                                icon: '//chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0000',
                                position: new google.maps.LatLng(-9.6950965, 33.2529972),
                                map: myMap,
                                title:'6'
                            });
                            contentString[2] = "<div style=color:black;font-size:10px>[object Object]</div>";
                            infos[2] = new google.maps.InfoWindow({
                                content: contentString[2]
                            });
                            markers[2].addListener('click', function(){
                                for (i = 0; i < infos.length; i++) {
                                    if (infos[i] != null) { infos[i].close(); }
                                }
                                infos[2].open(myMap, markers[2]);
                            });
                            markers[3] = new google.maps.Marker({
                                icon: '//chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff0000',
                                position: new google.maps.LatLng(-13.5153549, 33.5758837),
                                map: myMap,
                                title:'8'
                            });
                            contentString[3] = "<div style=color:black;font-size:10px>[object Object]</div>";
                            infos[3] = new google.maps.InfoWindow({
                                content: contentString[3]
                            });
                            markers[3].addListener('click', function(){
                                for (i = 0; i < infos.length; i++) {
                                    if (infos[i] != null) { infos[i].close(); }
                                }
                                infos[3].open(myMap, markers[3]);
                            });
                            markers[4] = new google.maps.Marker({
                                icon: '//chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff0000',
                                position: new google.maps.LatLng(-9.9459398, 33.898637),
                                map: myMap,
                                title:'9'
                            });
                            contentString[4] = "<div style=color:black;font-size:10px>[object Object]</div>";
                            infos[4] = new google.maps.InfoWindow({
                                content: contentString[4]
                            });
                            markers[4].addListener('click', function(){
                                for (i = 0; i < infos.length; i++) {
                                    if (infos[i] != null) { infos[i].close(); }
                                }
                                infos[4].open(myMap, markers[4]);
                            });
                            markers[5] = new google.maps.Marker({
                                icon: '//chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0000',
                                position: new google.maps.LatLng(-13.0386718, 33.4461157),
                                map: myMap,
                                title:'10'
                            });
                            contentString[5] = "<div style=color:black;font-size:10px>[object Object]</div>";
                            infos[5] = new google.maps.InfoWindow({
                                content: contentString[5]
                            });
                            markers[5].addListener('click', function(){
                                for (i = 0; i < infos.length; i++) {
                                    if (infos[i] != null) { infos[i].close(); }
                                }
                                infos[5].open(myMap, markers[5]);
                            });
                            markers[6] = new google.maps.Marker({
                                icon: '//chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff0000',
                                position: new google.maps.LatLng(-13.9548276, 33.6524764),
                                map: myMap,
                                title:'12'
                            });
                            contentString[6] = "<div style=color:black;font-size:10px>[object Object]</div>";
                            infos[6] = new google.maps.InfoWindow({
                                content: contentString[6]
                            });
                            markers[6].addListener('click', function(){
                                for (i = 0; i < infos.length; i++) {
                                    if (infos[i] != null) { infos[i].close(); }
                                }
                                infos[6].open(myMap, markers[6]);
                            });
                            markers[7] = new google.maps.Marker({
                                icon: '//chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff0000',
                                position: new google.maps.LatLng(-14.9022515, 35.2588976),
                                map: myMap,
                                title:'13'
                            });
                            contentString[7] = "<div style=color:black;font-size:10px>[object Object]</div>";
                            infos[7] = new google.maps.InfoWindow({
                                content: contentString[7]
                            });
                            markers[7].addListener('click', function(){
                                for (i = 0; i < infos.length; i++) {
                                    if (infos[i] != null) { infos[i].close(); }
                                }
                                infos[7].open(myMap, markers[7]);
                            });
                            markers[8] = new google.maps.Marker({
                                icon: '//chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0000',
                                position: new google.maps.LatLng(-14.4821359, 35.2352141),
                                map: myMap,
                                title:'14'
                            });
                            contentString[8] = "<div style=color:black;font-size:10px>[object Object]</div>";
                            infos[8] = new google.maps.InfoWindow({
                                content: contentString[8]
                            });
                            markers[8].addListener('click', function(){
                                for (i = 0; i < infos.length; i++) {
                                    if (infos[i] != null) { infos[i].close(); }
                                }
                                infos[8].open(myMap, markers[8]);
                            });
                            markers[9] = new google.maps.Marker({
                                icon: '//chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff0000',
                                position: new google.maps.LatLng(-15.911615, 35.6491944),
                                map: myMap,
                                title:'16'
                            });
                            contentString[9] = "<div style=color:black;font-size:10px>[object Object]</div>";
                            infos[9] = new google.maps.InfoWindow({
                                content: contentString[9]
                            });
                            markers[9].addListener('click', function(){
                                for (i = 0; i < infos.length; i++) {
                                    if (infos[i] != null) { infos[i].close(); }
                                }
                                infos[9].open(myMap, markers[9]);
                            });
                            markers[10] = new google.maps.Marker({
                                icon: '//chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff0000',
                                position: new google.maps.LatLng(-11.8996866, 33.5746477),
                                map: myMap,
                                title:'18'
                            });
                            contentString[10] = "<div style=color:black;font-size:10px>[object Object]</div>";
                            infos[10] = new google.maps.InfoWindow({
                                content: contentString[10]
                            });
                            markers[10].addListener('click', function(){
                                for (i = 0; i < infos.length; i++) {
                                    if (infos[i] != null) { infos[i].close(); }
                                }
                                infos[10].open(myMap, markers[10]);
                            });markers[11] = new google.maps.Marker({
                                icon: '//chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0000',
                                position: new google.maps.LatLng(-12.9269365, 34.2660997),
                                map: myMap,
                                title:'21'
                            });
                            contentString[11] = "<div style=color:black;font-size:10px>[object Object]</div>";
                            infos[11] = new google.maps.InfoWindow({
                                content: contentString[11]
                            });
                            markers[11].addListener('click', function(){
                                for (i = 0; i < infos.length; i++) {
                                    if (infos[i] != null) { infos[i].close(); }
                                }
                                infos[11].open(myMap, markers[11]);
                            });markers[12] = new google.maps.Marker({
                                icon: '//chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff0000',
                                position: new google.maps.LatLng(-16.7162988, 34.5492865),
                                map: myMap,
                                title:'22'
                            });
                            contentString[12] = "<div style=color:black;font-size:10px>[object Object]</div>";
                            infos[12] = new google.maps.InfoWindow({
                                content: contentString[12]
                            });
                            markers[12].addListener('click', function(){
                                for (i = 0; i < infos.length; i++) {
                                    if (infos[i] != null) { infos[i].close(); }
                                }
                                infos[12].open(myMap, markers[12]);
                            });markers[13] = new google.maps.Marker({
                                icon: '//chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff0000',
                                position: new google.maps.LatLng(-14.816608, 34.1263331),
                                map: myMap,
                                title:'23'
                            });
                            contentString[13] = "<div style=color:black;font-size:10px>[object Object]</div>";
                            infos[13] = new google.maps.InfoWindow({
                                content: contentString[13]
                            });
                            markers[13].addListener('click', function(){
                                for (i = 0; i < infos.length; i++) {
                                    if (infos[i] != null) { infos[i].close(); }
                                }
                                infos[13].open(myMap, markers[13]);
                            });markers[14] = new google.maps.Marker({
                                icon: '//chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0000',
                                position: new google.maps.LatLng(-13.2733935, 33.6372436),
                                map: myMap,
                                title:'24'
                            });
                            contentString[14] = "<div style=color:black;font-size:10px>[object Object]</div>";
                            infos[14] = new google.maps.InfoWindow({
                                content: contentString[14]
                            });
                            markers[14].addListener('click', function(){
                                for (i = 0; i < infos.length; i++) {
                                    if (infos[i] != null) { infos[i].close(); }
                                }
                                infos[14].open(myMap, markers[14]);
                            });markers[15] = new google.maps.Marker({
                                icon: '//chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff0000',
                                position: new google.maps.LatLng(-13.7369419, 34.1137488),
                                map: myMap,
                                title:'27'
                            });
                            contentString[15] = "<div style=color:black;font-size:10px>[object Object]</div>";
                            infos[15] = new google.maps.InfoWindow({
                                content: contentString[15]
                            });
                            markers[15].addListener('click', function(){
                                for (i = 0; i < infos.length; i++) {
                                    if (infos[i] != null) { infos[i].close(); }
                                }
                                infos[15].open(myMap, markers[15]);
                            });markers[16] = new google.maps.Marker({
                                icon: '//chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff0000',
                                position: new google.maps.LatLng(-16.0703308, 35.1327323),
                                map: myMap,
                                title:'28'
                            });
                            contentString[16] = "<div style=color:black;font-size:10px>[object Object]</div>";
                            infos[16] = new google.maps.InfoWindow({
                                content: contentString[16]
                            });
                            markers[16].addListener('click', function(){
                                for (i = 0; i < infos.length; i++) {
                                    if (infos[i] != null) { infos[i].close(); }
                                }
                                infos[16].open(myMap, markers[16]);
                            });markers[17] = new google.maps.Marker({
                                icon: '//chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0000',
                                position: new google.maps.LatLng(-15.3927992, 35.3085772),
                                map: myMap,
                                title:'29'
                            });
                            contentString[17] = "<div style=color:black;font-size:10px>[object Object]</div>";
                            infos[17] = new google.maps.InfoWindow({
                                content: contentString[17]
                            });
                            markers[17].addListener('click', function(){
                                for (i = 0; i < infos.length; i++) {
                                    if (infos[i] != null) { infos[i].close(); }
                                }
                                infos[17].open(myMap, markers[17]);
                            });markers[18] = new google.maps.Marker({
                                icon: '//chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff0000',
                                position: new google.maps.LatLng(-11.46556, 34.02071),
                                map: myMap,
                                title:'30'
                            });
                            contentString[18] = "<div style=color:black;font-size:10px>[object Object]</div>";
                            infos[18] = new google.maps.InfoWindow({
                                content: contentString[18]
                            });
                            markers[18].addListener('click', function(){
                                for (i = 0; i < infos.length; i++) {
                                    if (infos[i] != null) { infos[i].close(); }
                                }
                                infos[18].open(myMap, markers[18]);
                            });
                    let iconBase = '//maps.google.com/mapfiles/kml/paddle/';
                    let icons = {
                        green: {
                            name: 'On Course',
                            icon: iconBase + 'grn-circle.png'
                        },
                        yellow: {
                            name: 'Marginal',
                            icon: iconBase + 'ylw-circle.png'
                        },
                        red: {
                            name: 'Off Course',
                            icon: iconBase + 'red-circle.png'
                        }
                    };
                }