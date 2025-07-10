import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetContentService {

  private AdminContents : any [] = [
    {
    "icon" : "pi pi-star",
    "name" : "Favourites",
    "child" : [
       {
            "icon": "pi pi-chart-bar",
            "name" : "Dashboard",
            "route" : "/dashboard"
       },
       {
            "icon" : "pi pi-github",
            "name" : "Projects",
            "child" : [
                {
                    "icon" : "pi pi-code",
                    "name" : "Source code",
                    "route" : "---"
                },
                {
                    "icon" : "pi pi-microchip",
                    "name" : "Bussiness",
                    "child" : [
                        {
                            "icon" : "pi pi-amazon",
                            "name" : "Amazon",
                            "route" : "/our-amazon"
                        },
                        {
                            "icon" : "pi pi-google",
                            "name" : "Google",
                            "route" : "/our-google"
                        }
                    ]
                }
            ]
       },
       {
            "icon" : "pi pi-user",
            "name" : "Users",
            "route" : "/user"
       }
    ]
},


    {
        "icon" : "pi pi-cog",
        "name" : "Settings",
        "route" : "/setting"
    }, 
    {
        "icon" : "pi pi-shield",
        "name" : "Account & Privacy",
        "child" : [
            {
                "icon" : "pi pi-info-circle",
                "name" : "Personal Information",
                "route" : "/personal-info",

            },
            {
                "icon" : "pi pi-wifi",
                "name" : "Contact Information",
                "route" : "/contact"
            },
            {
                "icon" : "pi pi-bars",
                "name" : "Policies",
                "child" : [
                    {
                        "icon" : "pi pi-id-card",
                        "name" : "Personal Policy",
                        "route" : "/personal-policy"
                    },
                    {
                        "icon" : "pi pi-chart-line",
                        "name" : "Group Policy",
                        "route" : "/group-policy"
                    }
                ]
            } 
        ]
    },

    
  ]

  private UserContents : any [] = [
    {
    "icon" : "pi pi-star",
    "name" : "User Favourites",
    "child" : [
       {
            "icon" : "pi pi-github",
            "name" : "Projects",
            "child" : [
                {
                    "icon" : "pi pi-code",
                    "name" : "Source code",
                    "route" : "---"
                },
                {
                    "icon" : "pi pi-microchip",
                    "name" : "Bussiness",
                    "child" : [
                        {
                            "icon" : "pi pi-amazon",
                            "name" : "Amazon",
                            "route" : "/our-amazon"
                        },
                        {
                            "icon" : "pi pi-google",
                            "name" : "Google",
                            "route" : "/our-google"
                        }
                    ]
                }
            ]
       }
    ]
},


    {
        "icon" : "pi pi-shield",
        "name" : "Account & Privacy",
        "child" : [
            {
                "icon" : "pi pi-info-circle",
                "name" : "Personal Information",
                "route" : "/personal-info",

            },
            {
                "icon" : "pi pi-wifi",
                "name" : "Contact Information",
                "route" : "/contact"
            },
            {
                "icon" : "pi pi-bars",
                "name" : "Policies",
                "child" : [
                    {
                        "icon" : "pi pi-id-card",
                        "name" : "Personal Policy",
                        "route" : "/personal-policy"
                    }
                ]
            } 
        ]
    }
  ]

  getSideBarContents(role : string) {
    if(role == 'admin') {
      return this.AdminContents
    } else {
      return this.UserContents;
    }
  }

}
