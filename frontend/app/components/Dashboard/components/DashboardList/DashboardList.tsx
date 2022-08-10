import { observer } from 'mobx-react-lite';
import React from 'react';
import { NoContent, Pagination } from 'UI';
import { useStore } from 'App/mstore';
import { getRE } from 'App/utils';
import { sliceListPerPage } from 'App/utils';
import AnimatedSVG, { ICONS } from 'Shared/AnimatedSVG/AnimatedSVG';
import DashboardListItem from './DashboardListItem';

const filterList = <T extends Record<string, any>>(list: T[], searchQuery: string): T[] => {
  const filterRE = getRE(searchQuery, 'i');
  console.log(filterRE)
  let _list = list.filter((w: T) => {
      console.log(w.name, w.owner, w.description, filterRE.test(w.name))
      return filterRE.test(w.name) || filterRE.test(w.owner) || filterRE.test(w.description);
  });
  return _list
}

function DashboardList() {
    const { dashboardStore } = useStore();
    const [shownDashboards, setDashboards] = React.useState([]);
    const dashboards = dashboardStore.dashboards;
    const dashboardsSearch = dashboardStore.dashboardsSearch;

    React.useEffect(() => {
      setDashboards(filterList(dashboards, dashboardsSearch))
    }, [dashboardsSearch])
    
    const list = dashboardsSearch !== '' ? shownDashboards : dashboards;
    const lenth = list.length;

    return (
        <NoContent
            show={lenth === 0}
            title={
              <div className="flex flex-col items-center justify-center">
                <AnimatedSVG name={ICONS.NO_RESULTS} size={170} />
                <div className="mt-6 text-2xl">No data available.</div>
              </div>
            }   
        >
            <div className="mt-3 border-b">
                <div className="grid grid-cols-12 p-4 font-medium">
                  <div className="col-span-8">Title</div>
                  <div  className="col-span-2">Visibility</div>
                  <div className="col-span-2 text-right">Created</div>
                </div>

                {sliceListPerPage(list, dashboardStore.page - 1, dashboardStore.pageSize).map((dashboard: any) => (
                    <React.Fragment key={dashboard.dashboardId}>
                      <DashboardListItem dashboard={dashboard} />
                    </React.Fragment>
                ))}
            </div>

            <div className="w-full flex items-center justify-between pt-4">
                <div className="text-disabled-text">
                  Showing <span className="font-semibold">{Math.min(list.length, dashboardStore.pageSize)}</span> out of <span className="font-semibold">{list.length}</span> Dashboards
                </div>
                <Pagination
                  page={dashboardStore.page}
                  totalPages={Math.ceil(lenth / dashboardStore.pageSize)}
                  onPageChange={(page) => dashboardStore.updateKey('page', page)}
                  limit={dashboardStore.pageSize}
                  debounceRequest={100}
                />
            </div>
        </NoContent>
    );
}

export default observer(DashboardList);