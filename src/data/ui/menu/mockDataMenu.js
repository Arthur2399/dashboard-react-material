export const mockDataMenu = [
  {
      id: 1,
      title: "Inicio",
      to: "/",
      icon: "HomeOutlinedIcon",
  },
  {
      id: 2,
      titleGroup: "Administración",
  },
  {
      id: 3,
      title: "Empleados",
      to: "/employes",
      icon: "PieChartOutlineOutlinedIcon",
  },
  {
      id: 4,
      title: "Agenda",
      to: "/calendar",
      icon: "CalendarMonthIcon",
      subItems: [
          {
              id: 1,
              title: "Day",
              to: "/day",
              icon: "CalendarMonthIcon",
          },
          {
              id: 2,
              title: "Week",
              to: "/week",
              icon: "CalendarMonthIcon",
          },
          {
              id: 3,
              title: "Month",
              to: "/month",
              icon: "CalendarMonthIcon",
              subItems: [
                  {
                      id: 1,
                      title: "Day",
                      to: "/day",
                      icon: "CalendarMonthIcon",
                      subItems: [
                          {
                              id: 1,
                              title: "Day",
                              to: "/day",
                              icon: "CalendarMonthIcon",
                              subItems: [
                                  {
                                      id: 1,
                                      title: "Day",
                                      to: "/day",
                                      icon: "CalendarMonthIcon",
                                      subItems: [
                                          {
                                              id: 1,
                                              title: "Day",
                                              to: "/day",
                                              icon: "CalendarMonthIcon",
                                              
                                          },
                                      ]
                                      
                                  },
                              ]
                              
                          },
                      ]
                  },
              ]
          },
      ]
  },
  {
      id: 5,
      titleGroup: "Reportes",
  },
  {
      id: 6,
      title: "Contabilidad",
      to: "/",
      icon: "PieChartOutlineOutlinedIcon",
  },
  {
      id: 7,
      title: "Recursos humanos",
      to: "/",
      icon: "PieChartOutlineOutlinedIcon",
  },
]