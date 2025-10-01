using iPractice.Api.Models.Clients;

namespace iPractice.Api.Controllers.Clients.Dtos;

public record ClientSummaryDto(long Id, string Name)
{
    public static ClientSummaryDto From(Client client)
    {
        return new(client.Id, client.Name);
    }
} 