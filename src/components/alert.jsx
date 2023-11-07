import {Fragment} from "react";
import {connect} from "react-redux";
import {CheckCircleIcon} from "@heroicons/react/24/outline";
function Alert({alert}) {
    const displayAlert = () => {
        if (alert !== null) {
            console.log(alert.alertType)
            const colour = alert.alertType
            console.log(colour)
            return (
                <>
                 <div className={`rounded-md bg-${colour}-50 p-4`}>
                <div className="flex">
                    <div className="flex-shrink-0">
                    <CheckCircleIcon className={"h-5 w-5 text-"+alert.alertType+"-400"} />
                    </div>
                    <div className="ml-3">
                    <p className={`text-sm font-medium text-${alert.alertType}-800`}>{alert.msg}</p>
                    </div>
                </div>
                </div>
                </>
            )
        } else {
            return (
                <Fragment></Fragment>
            )
        }
    }
    return (
        <Fragment> {
            displayAlert()
        } </Fragment>
    )
}

const mapStateToProps = state => ({alert: state.Alert.alert})
export default connect(mapStateToProps)(Alert)
