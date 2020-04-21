import DistanceService from "../DistanceService";
import { Point } from "geojson";
import mockedGeocoderItem from "../__mocks__/GeocoderItem";
import mockedParkrunFeatureCollection from "../__mocks__/ParkrunFeatureCollection";
import mockedParkrunFeatureCollectionWithDistances from "../__mocks__/ParkrunFeatureCollectionWithDistances";
import mockedSortedParkrunFeatureCollection from "../__mocks__/SortedParkrunFeatureCollection";

describe("DistanceService", () => {
  test("Distance is calculated correctly between two valid points.", () => {
    const dummyPoint1 = { type: "Point", coordinates: [0.1246, 51.5007] } as Point;
    const dummyPoint2 = { type: "Point", coordinates: [0.1657, 51.5073] } as Point;
    const expectedDistance = 2941;
    const distance = DistanceService.calculateDistance(dummyPoint1, dummyPoint2);
    expect(distance).toEqual(2941);
  })

  test("The sort parkruns function returns the same parkrun FeatureCollection when providing parkruns with no distanceToAddress attribute.", () => {
    const parkruns = DistanceService.sortParkruns(mockedParkrunFeatureCollection);
    expect(parkruns).toEqual(mockedParkrunFeatureCollection);
  })

  test("The sort parkruns function returns a FeatureCollection in ascending order of features using the distanceToAddress attribute.", () => {
    const parkruns = DistanceService.sortParkruns(mockedParkrunFeatureCollectionWithDistances);
    expect(parkruns).toEqual(mockedSortedParkrunFeatureCollection);
  })

  test("The NUM_NEAREST (3 in test env) closest parkruns are identified when given a sorted parkrun FeatureCollection.", () => {
    const parkruns = DistanceService.setNearestParkrunAttributes(mockedSortedParkrunFeatureCollection);
    const nearestParkruns = parkruns.features.filter((f) => f.properties.parkrunClose === "true");
    expect(nearestParkruns.length).toEqual(parseInt(process.env.NUM_NEAREST));
    expect(nearestParkruns[0].properties.distanceToAddress).toEqual(80);
    expect(nearestParkruns[1].properties.distanceToAddress).toEqual(400);
    expect(nearestParkruns[2].properties.distanceToAddress).toEqual(800);
    expect(nearestParkruns[0].properties.position).toEqual(1);
    expect(nearestParkruns[1].properties.position).toEqual(2);
    expect(nearestParkruns[2].properties.position).toEqual(3);
  })
})
