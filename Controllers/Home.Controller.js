const ProjectsModel = require("../Models/Project.Model")
const GenericModel = require("../Models/Generic.Model")
module.exports = class{

    constructor(hbs){
        this.projectsmodel = new ProjectsModel()
        this.generic = new GenericModel()
        this.hbs = hbs
    }

    RenderHomePage = async (req, res)=>{
        let stats = null
        let projects = await this.projectsmodel.GetSocialProjects({})
        let investments = await this.projectsmodel.GetCommercialProjects({})
        let value_of_social_projects = await this.projectsmodel.GetSocialProjectsValue()
        let value_of_commercial_projects = await this.projectsmodel.GetCommercialProjectsValue()
        let mapCode = "<script>setTimeout(()=>{alert('Map failed to load!')},5000)</script>"
        try{
            
            stats = {
                "projectCount":projects.filter(record=>record.ApplicationStatus == 3 && record.Approved == 1).length,
                "investmentsCount":investments.length,
                value_of_social_projects,
                value_of_commercial_projects,
            }
            mapCode = await this.generateMapCode()
            this.hbs.registerPartial('mapCode', mapCode)
        }catch(err){
            //console.log(err)
        }finally{
            console.log(stats)
            res.render('dashboard',{
                title:"Dashboard",
                stats,
                alert:req.session.messageBody,
                user:req.session.userdata
            })
            req.session.messageBody = null
        }
        
    }

    GetStatistics = async (req, res)=>{
        let status, message, data, PBS, IBS

        let Query = `select b.ID,Sector,sum(FundsDisbursed) as Number from Projects a
        inner join ProjectSectors b on a.fundingsector=b.ID
        WHERE a.Approved = 1
        group by b.ID,Sector
        order by b.ID`
        let Query2 = `select b.ID,b.Sector,sum(CurrentValuation) as Number from InvestmentsView a
        inner join InvestmentSectors b on a.sectorid=b.ID
        group by b.ID,b.Sector
        order by b.ID`
        try{
            PBS = await this.generic.GetJSON(Query)
            IBS = await this.generic.GetJSON(Query2)

            status = "success"
            message = "Stats collected successfully!"

            data = {
                PBS,
                IBS
            }
        }catch(err){
            status = "error"
            message = err.message
        }finally{
            res.json({status,message, data})
        }
    }

    generateMapCode =  ()=>{
        return new Promise(async (resolve,reject)=>{
            try {
                const markers = await this.constructMapMarkers()
                let mapCode = `
                <script>
                    let markers = [];
                    let infos = [];
                    let contentString = [];
                    
                    function initialize() {

                        try{
                            console.log("Initializing maps...")
                            
                            var mapOptions = {
                                center: new google.maps.LatLng(-12.9548276,34.1524764),
                                zoom: 7,
                                mapTypeId: google.maps.MapTypeId.ROADMAP
                            };
                            var myMap = new google.maps.Map(document.getElementById('mapArea'),
                                mapOptions);
    
                            ${markers}
                            var iconBase = '//maps.google.com/mapfiles/kml/paddle/';
                            var icons = {
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

                            console.log("Map initialized successfully!")
                        }catch(err){
                            console.log('map initialization failed!')
                            console.log(err)
                        }finally{
                            $('#map-loader').hide()
                        }
                    }

                    $(()=>{
                    })
                </script>
                `
                resolve(mapCode)
            } catch (error) {
                console.log(error)
                reject(error)
            }
        })
    }
    constructMapMarkers =  ()=>{
        return new Promise(async (resolve, reject)=>{
            try{
                let QueryString = `select District,Latitude,Longitude, count(*) as Number from projects a
                inner join districts b on a.district = b.ID
                where Latitude is not null and Longitude is not null and ApplicationStatus=3
                Group by District,Latitude,Longitude`
    
                const reader = await this.generic.GetJSON(QueryString)
                let markers = ""
               
                //console.log(reader)
                for(let i = 0; i < reader.length; i++){
                 
                    let colors = ['ff0000','ff0000', 'FF0000']
                    let color = i % 3
                    let newColor = colors[color]
    
                    QueryString = `select concat('<a style=font-size:16px; font-weight:bold; href=/project-details?ID=',ID,'>',projects.ApplicantName, ' - ', projects.ProjectDescription,'</a>') as Projects
                    from Projects where district='${reader[i].District}' and ApplicationStatus=3`
    
                    let details = await this.generic.GetJSON(QueryString)
                    markers += `markers[${i}] = new google.maps.Marker({
                                    icon: '//chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${newColor}',
                                    position: new google.maps.LatLng(${reader[i].Latitude}, ${reader[i].Longitude}),
                                    map: myMap,
                                    title:'${reader[i].District}'
                                });

                            contentString[${i}] = "<div style=color:black;font-size:10px>${details[0].Projects}</div>";
                            infos[${i}] = new google.maps.InfoWindow({
                                content: contentString[${i}]
                            });

                            markers[${i}].addListener('click', function(){
                                for (i = 0; i < infos.length; i++) {
                                    if (infos[i] != null) { infos[i].close(); }
                                }
                                infos[${i}].open(myMap, markers[${i}]);
                            });`
                }
                resolve(markers);
            }catch(err){
                reject(err)
            }
        })
    }

}