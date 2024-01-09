"use client"
import React from "react"
import Map from "react-map-gl"

const MapboxGlobe = () => {
  return (
    <Map
      ref={(mapRef) => {
        // store.map = mapRef?.getMap() ? ref(mapRef.getMap()) : null
      }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
      mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL!}
      // initialViewState={store.viewState}
      // interactiveLayerIds={[clusterLayer.id ?? ""]}
      projection={{ name: "globe" as any }}
      // onMove={({ viewState }) => {
      //   store.viewState = viewState
      // }}
      // onRender={updateMarkers}
      // onClick={onClick}
      attributionControl={false}
      reuseMaps
    >
      {/* <Source
        id={sourceId}
        type={"geojson"}
        data={data}
        cluster={true}
        clusterMaxZoom={13}
        clusterRadius={150}
        
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
      <Markers entries={entries} />
      <AttributionControl position="bottom-left"/> */}
    </Map>
  )
}

export default MapboxGlobe
