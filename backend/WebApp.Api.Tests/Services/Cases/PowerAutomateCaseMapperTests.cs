using System.Text.Json;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using WebApp.Api.Services.Cases;

namespace WebApp.Api.Tests.Services.Cases;

[TestClass]
public sealed class PowerAutomateCaseMapperTests
{
    [TestMethod]
    public void MapCollection_NormalizesObjectsAndSerializedArrays()
    {
        using var document = JsonDocument.Parse(
            """
            {
              "body": {
                "items": [
                  {
                    "id": 12,
                    "title": "Optimización de Cadena de Suministro",
                    "status": {
                      "Value": "Borrador"
                    },
                    "technologies": [
                      {
                        "Nombre": "Módulo ERP de Inventarios"
                      }
                    ],
                    "tags": "[{\"tag\":\"ERP\"},{\"tag\":\"Logística\"}]",
                    "impact": {
                      "ResultadoObtenido_RO": "Reducción del 35%"
                    },
                    "location": ""
                  }
                ],
                "total": 1,
                "lastUpdatedUtc": "2026-08-24T13:07:21Z"
              }
            }
            """
        );

        var result =
            PowerAutomateCaseMapper.MapCollection(
                document.RootElement
            );

        Assert.HasCount(
            1,
            result.Items
        );

        var item =
            result.Items[0];

        Assert.AreEqual(
            "12",
            item.Id
        );

        Assert.AreEqual(
            "Borrador",
            item.Status
        );

        CollectionAssert.AreEqual(
            new[]
            {
                "Módulo ERP de Inventarios",
            },
            item.Technologies.ToArray()
        );

        CollectionAssert.AreEqual(
            new[]
            {
                "ERP",
                "Logística",
            },
            item.Tags.ToArray()
        );

        Assert.AreEqual(
            "Reducción del 35%",
            item.Impact
        );

        Assert.IsNull(
            item.Location
        );
    }

    [TestMethod]
    public void MapDetail_NormalizesSerializedCollectionsAndEmptyValues()
    {
        using var document = JsonDocument.Parse(
            """
            {
              "id": "15",
              "title": "PROYECTO INTERNO CONSEIN (PRUEBA)",
              "status": "Borrador",
              "strategicReflection": "",
              "technologies": "[]",
              "tags": "[{\"tag\":\"Atención digital\"},{\"tag\":\"Automatización\"}]",
              "results": "[{\"ResultadoObtenido_RO\":\"Reducción proyectada\"}]",
              "lessons": "[]",
              "risks": "[]",
              "innovations": "[]",
              "observations": "[]",
              "implementedSolutions": "[]"
            }
            """
        );

        var result =
            PowerAutomateCaseMapper.MapDetail(
                document.RootElement
            );

        Assert.AreEqual(
            "15",
            result.Id
        );

        Assert.AreEqual(
            "Borrador",
            result.Status
        );

        Assert.IsNull(
            result.StrategicReflection
        );

        Assert.IsEmpty(
            result.Technologies
        );

        CollectionAssert.AreEqual(
            new[]
            {
                "Atención digital",
                "Automatización",
            },
            result.Tags.ToArray()
        );

        CollectionAssert.AreEqual(
            new[]
            {
                "Reducción proyectada",
            },
            result.Results.ToArray()
        );

        Assert.IsEmpty(
            result.Lessons
        );
    }

    [TestMethod]
    public void MapDetail_NormalizesSerializedSharePointStatusObject()
    {
        using var document = JsonDocument.Parse(
            """
            {
              "id": 15,
              "title": "Caso",
              "status": "{\"@odata.type\":\"#Microsoft.Azure.Connectors.SharePoint.SPListExpandedReference\",\"Id\":0,\"Value\":\"Publicado\"}"
            }
            """
        );

        var result =
            PowerAutomateCaseMapper.MapDetail(
                document.RootElement
            );

        Assert.AreEqual(
            "Publicado",
            result.Status
        );
    }

    [TestMethod]
    public void MapDetail_ThrowsWhenIdIsMissing()
    {
        using var document = JsonDocument.Parse(
            """
            {
              "title": "Caso sin ID"
            }
            """
        );

        Assert.ThrowsExactly<CasesIntegrationException>(
            () =>
                PowerAutomateCaseMapper.MapDetail(
                    document.RootElement
                )
        );
    }
}